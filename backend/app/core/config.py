from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str
    DATABASE_URL: str
    DEBUG: bool = False
    TOP_K: int = 3

    class Config:
        env_file = ".env"


settings = Settings()
