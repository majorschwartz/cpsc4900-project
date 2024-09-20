from pydantic import BaseModel
from typing import Optional
from fastapi import HTTPException, APIRouter, Request
from fastapi.responses import JSONResponse
import requests
from starlette.concurrency import run_in_threadpool
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from utils.decorators import token_required
from config import SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, ORIGIN_ENDPOINT
from database.database import user_collection
import datetime
import jwt

router = APIRouter()

# Google login route
class GoogleLoginRequest(BaseModel):
    code: str


class GoogleLoginThreadClient:
    def get_token(self, code):
        return requests.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": ORIGIN_ENDPOINT,
                "grant_type": "authorization_code",
            },
        )

    def verify_id_token(self, id_token_jwt):
        return id_token.verify_oauth2_token(
            id_token_jwt, google_requests.Request(), GOOGLE_CLIENT_ID
        )

google_login_thread_client = GoogleLoginThreadClient()

@router.post("/google-auth")
async def google_auth(request: GoogleLoginRequest):
    print(f"Google logging in user: {request}\n")

    data = request.model_dump()
    code = data.get("code")

    if not code:
        raise HTTPException(status_code=401, detail="Invalid credentials.")

    try:
        token_response = await run_in_threadpool(
            google_login_thread_client.get_token, code=code
        )

        token_response_data = token_response.json()
        id_token_jwt = token_response_data.get("id_token")

        if not id_token_jwt:
            raise HTTPException(status_code=401, detail="Failed to obtain ID token.")

        id_info = await run_in_threadpool(
            google_login_thread_client.verify_id_token, id_token_jwt=id_token_jwt
        )

        email = id_info["email"]
        first_name = None
        last_name = None
        try:
            first_name = id_info["given_name"]
        except:
            pass
        try:
            last_name = id_info["family_name"]
        except:
            pass

        user = await user_collection.find_one({"email": email})

        if not user:
            user_obj = {
                "first_name": first_name if first_name is not None else "human",
                "last_name": last_name if last_name is not None else "being",
                "email": email,
                "created_at": datetime.datetime.now(datetime.UTC),
                "onboarding_complete": False,
            }

            await user_collection.insert_one(user_obj)

        token = jwt.encode(
            {
                "email": email,
                "iat": datetime.datetime.now(datetime.UTC),
                "exp": datetime.datetime.now(datetime.UTC) + datetime.timedelta(days=30),
            },
            SECRET_KEY,
            algorithm="HS256",
        )
        return JSONResponse(content={"token": token}, status_code=200)
    except Exception as e:
        print(f"Error during Google login: {str(e)}\n")
        raise HTTPException(status_code=401, detail="Failed to log in with Google.")

# Get user route
@router.get("/user")
@token_required
async def get_user(request: Request):
    current_user = request.state.current_user
    if current_user:
        user_data = {
            "uid": str(current_user["_id"]),
            "first_name": current_user["first_name"],
            "last_name": current_user["last_name"],
            "email": current_user["email"],
            "created_at": str(current_user["created_at"]),
            "onboarding_complete": current_user["onboarding_complete"],
        }
        return JSONResponse(content=user_data, status_code=200)
    raise HTTPException(status_code=404, detail="User not found.")