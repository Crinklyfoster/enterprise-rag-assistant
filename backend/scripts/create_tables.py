from app.database.db import Base
from app.database.db import engine

from app.models.document import Document
from app.models.chat_session import ChatSession
from app.models.message import Message

Base.metadata.create_all(bind=engine)

print("Tables created successfully")