from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class DocumentCreate(BaseModel):
    filename: str
    file_path: str


class DocumentResponse(BaseModel):
    id: UUID
    filename: str
    file_path: str
    status: str
    uploaded_at: datetime

    class Config:
        from_attributes = True
