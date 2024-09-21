from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from utils.decorators import token_required
from database.db_insert import insert_equipment
from database.db_find import find_equipment_by_user_id
from database.db_update import update_equipment

router = APIRouter()


class Equipment(BaseModel):
	user_id: str
	equipment: dict


@router.post("/equipment")
@token_required
async def create_equipment(request: Request, equipment: Equipment):
	user_id = request.state.current_user["_id"]
	db_equipment = await find_equipment_by_user_id(user_id)

	if db_equipment:
		await update_equipment(user_id, equipment.equipment)
		return JSONResponse(content={"message": "Equipment updated successfully"}, status_code=204)
	else:
		await insert_equipment(user_id, equipment.equipment)
		return JSONResponse(content={"message": "Equipment created successfully"}, status_code=201)


@router.get("/equipment")
@token_required
async def get_equipment(request: Request):
	user_id = request.state.current_user["_id"]
	db_equipment = await find_equipment_by_user_id(user_id)
	if db_equipment:
		return JSONResponse(content=db_equipment, status_code=200)
	else:
		return JSONResponse(content={"message": "Equipment not found"}, status_code=404)
