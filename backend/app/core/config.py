from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Enterprise RAG Assistant"
    DATABASE_URL: str
    DEBUG: bool = False
    TOP_K: int = 3
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    EMBEDDING_MODEL: str = "nomic-embed-text"
    CHAT_MODEL: str = "qwen3:8b"

    class Config:
        env_file = ".env"


settings = Settings()
