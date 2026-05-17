from mongoengine import (
    Document,
    StringField,
    DateTimeField,
    ListField,
    EmbeddedDocument,
    EmbeddedDocumentField,
    ObjectIdField,
)
from datetime import datetime
import pytz


def indian_time():
    india_tz = pytz.timezone("Asia/Kolkata")
    return datetime.now(india_tz)


class Chat(EmbeddedDocument):
    role = StringField(required=True)
    content = StringField(required=True)
    date = DateTimeField(default=indian_time)


class Messages(Document):
    title = StringField(required=True)
    messages = ListField(EmbeddedDocumentField(Chat))
    userId = ObjectIdField(required=True)
