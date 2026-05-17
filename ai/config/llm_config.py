import os
from langchain_google_genai import GoogleGenerativeAI


def get_llm():
    llm = GoogleGenerativeAI(
        model=os.environ.get("MODEL"),
        google_api_key=os.environ.get("GEMINI_API_KEY"),
    )
    return llm
