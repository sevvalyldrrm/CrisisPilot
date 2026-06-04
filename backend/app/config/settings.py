from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    mongodb_uri = os.getenv("MONGODB_URI")


settings = Settings()