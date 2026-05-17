import requests
import os
from fastapi import Request, HTTPException

url = os.getenv("REQUEST_URL", "")


def get_current_user(request: Request):
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(
            status_code=401, detail={"message": "Not authenticated", "status": "error"}
        )

    try:
        response = requests.get(url, headers={"Authorization": token})
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(
                status_code=401, detail={"message": "Invalid token", "status": "error"}
            )
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))
