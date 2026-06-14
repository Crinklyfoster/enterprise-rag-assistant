from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.core.config import settings


class DocumentChunker:

    def __init__(
        self,
        chunk_size: int = settings.CHUNK_SIZE,
        chunk_overlap: int = settings.CHUNK_OVERLAP
    ):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                ""
            ]
        )

    def chunk_text(self, text: str):
        chunks = self.splitter.split_text(text)

        return [
            {
                "chunk_id": idx,
                "text": chunk
            }
            for idx, chunk in enumerate(chunks)
        ]
