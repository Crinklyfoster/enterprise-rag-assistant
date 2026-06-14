from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database.db import get_db
from app.rag.query_rewriter import QueryRewriter
from app.schemas.chat import (
    ChatRequest,
    ChatResponse
)
from app.services.rag_service import RAGService

from app.services.chat_memory_service import (
    ChatMemoryService
)

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

rag_service = RAGService()
query_rewriter = QueryRewriter()


@router.post(
    "/",
    response_model=ChatResponse
)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db)
):
    ChatMemoryService.save_message(
        db=db,
        session_id=request.session_id,
        role="user",
        content=request.question
    )

    messages = ChatMemoryService.get_recent_messages(
        db=db,
        session_id=request.session_id
    )

    conversation_history = "\n".join(
        f"{message.role}: {message.content}"
        for message in messages
    )

    rewritten_question = query_rewriter.rewrite(
        question=request.question,
        conversation_history=conversation_history
    )

    result = rag_service.answer_question(
        question=rewritten_question,
        document_id=request.document_id,
        conversation_history=conversation_history
    )

    ChatMemoryService.save_message(
        db=db,
        session_id=request.session_id,
        role="assistant",
        content=result["answer"]
    )

    return ChatResponse(
        answer=result["answer"],
        sources=result["sources"]
    )


@router.post("/sessions")
def create_session(
    document_id: str,
    db: Session = Depends(get_db)
):
    session = (
        ChatMemoryService.create_session(
            db,
            document_id
        )
    )

    return {
        "session_id": str(session.id)
    }
