from mongoengine import connect
import os

def db_config():
    try:
        db = connect(
            db=os.getenv("DB"),
            host=os.getenv("MONGODB_URI")
        )

        db.admin.command("ping")

        print("MongoDB connected successfully")

    except Exception as e:
        raise RuntimeError("Failed to connect to MongoDB", str(e))