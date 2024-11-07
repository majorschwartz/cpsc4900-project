from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from utils.decorators import token_required
from database.db_update import update_user_privacy

router = APIRouter()

class PrivacyUpdate(BaseModel):
    hide_recipes: bool

# Get user route
@router.get("/user")
@token_required
async def get_user(request: Request):
    current_user = request.state.current_user
    if current_user:
        user_data = {
            "first_name": current_user["first_name"],
            "last_name": current_user["last_name"],
            "email": current_user["email"],
            "hide_recipes": current_user["hide_recipes"],
            "onboarding_complete": current_user["onboarding_complete"],
        }
        return JSONResponse(content=user_data, status_code=200)
    raise HTTPException(status_code=404, detail="User not found.")

@router.put("/user/privacy")
@token_required
async def update_privacy(request: Request, privacy: PrivacyUpdate):
    try:
        current_user = request.state.current_user
        await update_user_privacy(current_user["_id"], privacy.hide_recipes)
        return JSONResponse(
            content={"message": "Privacy settings updated successfully"},
            status_code=200
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))