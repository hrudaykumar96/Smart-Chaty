from bson import ObjectId
from datetime import datetime
import json


def fetch_chat(Messages, current_user):
    def serialize_chat(chat):
        chat_dict = chat.to_mongo().to_dict()
        return json.loads(json.dumps(chat_dict, default=str))

    chats = Messages.objects(userId=current_user["data"]["_id"])
    return [serialize_chat(chat) for chat in chats]
