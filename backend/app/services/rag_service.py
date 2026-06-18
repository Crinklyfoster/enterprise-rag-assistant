from app.core.config import settings
from app.rag.retriever import Retriever
from app.rag.generator import Generator
from app.core.metrics import CHAT_REQUESTS

class RAGService:

    def __init__(self):
        self.retriever = Retriever()
        self.generator = Generator()

    def answer_question(
        self,
        question: str,
        document_id,
        conversation_history: str = "",
        top_k: int = settings.TOP_K
    ):
        CHAT_REQUESTS.inc()

        retrieved_chunks = self.retriever.retrieve(
            question,
            document_id=document_id,
            top_k=top_k
        )


        if not retrieved_chunks:
            return {
                "question": question,
                "answer": (
                    "I could not find that information "
                    "in the document."
                ),
                "sources": []
            }

        context = "\n\n".join(
            chunk["text"]
            for chunk in retrieved_chunks
        )

        answer = self.generator.generate(
            context=context,
            question=question,
            conversation_history=conversation_history
        )

        return {
            "question": question,
            "answer": answer,
            "sources": [
                {
                    "chunk_id": chunk["metadata"]["chunk_id"],
                    "document_id": chunk["metadata"]["document_id"],
                    "score": chunk["distance"],
                    "preview": chunk["text"][:200]
                }
                for chunk in retrieved_chunks
            ]
        }