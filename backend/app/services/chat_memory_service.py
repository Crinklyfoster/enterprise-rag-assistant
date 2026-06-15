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
    def get_sessions(db):
        return (
            db.query(ChatSession)
            .order_by(ChatSession.created_at.desc())
            .all()
        )

    @staticmethod
    def get_session(
        db,
        session_id
    ):
        return (
            db.query(ChatSession)
            .filter(ChatSession.id == session_id)
            .first()
        )

    @staticmethod
    def rename_session(
        db,
        session_id,
        title
    ):
        session = ChatMemoryService.get_session(
            db,
            session_id
        )

        if session is None:
            return None

        session.title = title
        db.commit()
        db.refresh(session)

        return session

    @staticmethod
    def delete_session(
        db,
        session_id
    ):
        session = ChatMemoryService.get_session(
            db,
            session_id
        )

        if session is None:
            return False

        (
            db.query(Message)
            .filter(Message.session_id == session_id)
            .delete(synchronize_session=False)
        )
        db.delete(session)
        db.commit()

        return True

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

    @staticmethod
    def get_messages(
        db,
        session_id
    ):
        return (
            db.query(Message)
            .filter(
                Message.session_id == session_id
            )
            .order_by(
                Message.created_at.asc()
            )
            .all()
        )
