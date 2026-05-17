from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from routes.message_routes import router as message_routes
from config.db_config import db_config
from fastapi.responses import JSONResponse

load_dotenv()


app = FastAPI()
db_config()


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(_, exc: HTTPException):
    return JSONResponse(content=exc.detail)


origins = os.getenv("ORIGINS", "*")

app.include_router(message_routes)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
