from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from utils.decorators import token_required
from utils.helpers import convertObjectIds
from database.db_insert import insert_preferences
from database.db_find import find_preferences_by_user_id
from database.db_update import update_preferences

router = APIRouter()


class Preferences(BaseModel):
	preferences: list


@router.post("/preferences")
@token_required
async def create_preferences(request: Request, preferences: Preferences):
	user_id = request.state.current_user["_id"]
	db_preferences = await find_preferences_by_user_id(user_id)

	if db_preferences:
		await update_preferences(user_id, preferences.preferences)
		return JSONResponse(content={"message": "Preferences updated successfully"}, status_code=204)
	else:
		await insert_preferences(user_id, preferences.preferences)
		return JSONResponse(content={"message": "Preferences created successfully"}, status_code=201)


@router.get("/preferences")
@token_required
async def get_preferences(request: Request):
	user_id = request.state.current_user["_id"]
	db_preferences = await find_preferences_by_user_id(user_id)
	if db_preferences:
		db_preferences = await convertObjectIds(db_preferences)
		return JSONResponse(content=db_preferences, status_code=200)
	else:
		return JSONResponse(content={"message": "Preferences not found"}, status_code=404)
