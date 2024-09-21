from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from utils.decorators import token_required

router = APIRouter()

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