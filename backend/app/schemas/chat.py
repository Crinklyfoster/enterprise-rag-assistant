from pydantic import BaseModel


class ChatRequest(BaseModel):
    document_id: str
    question: str


class Source(BaseModel):
    chunk_id: int
    document_id: str
    score: float
    preview: str


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]