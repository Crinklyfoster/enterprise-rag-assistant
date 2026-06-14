from app.core.config import settings
from app.rag.retriever import Retriever
from app.rag.generator import Generator


class RAGService:

    def __init__(self):
        self.retriever = Retriever()
        self.generator = Generator()

    def answer_question(
        self,
        question: str,
        document_id,
        top_k: int = settings.TOP_K
    ):
        retrieved_chunks = self.retriever.retrieve(
            question,
            document_id=document_id,
            top_k=top_k
        )

        # Don't call the LLM if nothing relevant was found
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
            question=question
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
