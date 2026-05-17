from fastapi.routing import APIRouter
from fastapi import Depends, Request
from utils.authentication import get_current_user
from utils.fetch_chat import fetch_chat
from fastapi.responses import JSONResponse
from config.llm_config import get_llm
from langchain_core.prompts import ChatPromptTemplate
from models.Messages import Messages

router = APIRouter()


@router.post("/new-chat")
async def send_message(current_user=Depends(get_current_user)):
    try:
        if not current_user:
            return JSONResponse(
                status_code=401,
                content={"message": "Not authenticated", "status": "error"},
            )

        newChat = Messages(
            title="New Chat",
            userId=current_user["data"]["_id"],
            messages=[
                {
                    "role": "assistant",
                    "content": "Hello! How can I help you today?",
                },
            ],
        )

        newChat.save()

        chats_list = fetch_chat(Messages, current_user)

        return JSONResponse(
            status_code=200,
            content={
                "message": "Chat created successfully",
                "status": "success",
                "data": chats_list,
            },
        )

    except Exception as e:
        return JSONResponse(
            status_code=500, content={"message": str(e), "status": "error"}
        )


@router.post("/delete-chat")
async def delete_message(request: Request, current_user=Depends(get_current_user)):
    try:
        if not current_user:
            return JSONResponse(
                status_code=401,
                content={"message": "Not authenticated", "status": "error"},
            )

        payload = await request.json()
        if not payload:
            return JSONResponse(
                status_code=400,
                content={"message": "Payload is required", "status": "error"},
            )

        chatId = payload.get("chatId")
        if not chatId:
            return JSONResponse(
                status_code=400,
                content={"message": "Chat ID is required", "status": "error"},
            )

        chat = Messages.objects(userId=current_user["data"]["_id"], id=chatId)
        if not chat:
            return JSONResponse(
                status_code=404,
                content={"message": "Chat not found", "status": "error"},
            )

        chat.delete()

        chats_list = fetch_chat(Messages, current_user)

        return JSONResponse(
            status_code=200,
            content={
                "message": "Chat deleted successfully",
                "status": "success",
                "data": chats_list,
            },
        )

    except Exception as e:
        return JSONResponse(
            status_code=500, content={"message": str(e), "status": "error"}
        )


@router.get("/get-chats")
async def get_chats(current_user=Depends(get_current_user)):
    try:
        if not current_user:
            return JSONResponse(
                status_code=401,
                content={"message": "Not authenticated", "status": "error"},
            )

        chats_list = fetch_chat(Messages, current_user)

        return JSONResponse(
            status_code=200,
            content={
                "message": "Chats fetched successfully",
                "status": "success",
                "data": chats_list,
            },
        )

    except Exception as e:
        return JSONResponse(
            status_code=500, content={"message": str(e), "status": "error"}
        )
