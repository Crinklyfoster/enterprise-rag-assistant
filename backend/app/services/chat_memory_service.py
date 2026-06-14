from app.models.message import Message
from app.models.chat_session import ChatSession


class ChatMemoryService:

    @staticmethod
    def create_session(
        db,
        document_id
    ):
        session = ChatSession(
            document_id=document_id
        )

        db.add(session)
        db.commit()
        db.refresh(session)

        return session

    @staticmethod
    def save_message(
        db,
        session_id,
        role,
        content
    ):
        message = Message(
            session_id=session_id,
            role=role,
            content=content
        )

        db.add(message)
        db.commit()

    @staticmethod
    def get_recent_messages(
        db,
        session_id,
        limit=6
    ):
        messages = (
            db.query(Message)
            .filter(
                Message.session_id == session_id
            )
            .order_by(
                Message.created_at.desc()
            )
            .limit(limit)
            .all()
        )

        return list(reversed(messages))