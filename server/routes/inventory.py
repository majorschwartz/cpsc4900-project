from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from utils.decorators import token_required
from utils.helpers import convertObjectIds
from database.db_insert import insert_inventory
from database.db_find import find_inventory_by_user_id
from database.db_update import update_inventory, update_user_onboarding

router = APIRouter()


class Inventory(BaseModel):
	inventory: dict


@router.post("/inventory")
@token_required
async def create_inventory_endpoint(request: Request, inventory: Inventory):
	user_id = request.state.current_user["_id"]
	db_inventory = await find_inventory_by_user_id(user_id)

	if db_inventory:
		await update_inventory(user_id, inventory.inventory)
		return JSONResponse(content={"message": "Inventory updated successfully"}, status_code=204)
	else:
		await insert_inventory(user_id, inventory.inventory)
		await update_user_onboarding(user_id, True)
		return JSONResponse(content={"message": "Inventory created successfully and onboarding completed"}, status_code=201)

@router.put("/inventory")
@token_required
async def update_inventory_endpoint(request: Request, inventory: Inventory):
	user_id = request.state.current_user["_id"]
	await update_inventory(user_id, inventory.inventory)
	return JSONResponse(content={"message": "Inventory updated successfully"}, status_code=200)

@router.get("/inventory")
@token_required
async def get_inventory_endpoint(request: Request):
	user_id = request.state.current_user["_id"]
	db_inventory = await find_inventory_by_user_id(user_id)

	if db_inventory:
		db_inventory = await convertObjectIds(db_inventory)
		return JSONResponse(content=db_inventory, status_code=200)
	else:
		return JSONResponse(content={"message": "Inventory not found"}, status_code=404)

@router.post("/update-onboarding")
@token_required
async def update_onboarding(request: Request):
	user_id = request.state.current_user["_id"]
	await update_user_onboarding(user_id, True)
	return JSONResponse(content={"message": "Onboarding updated successfully"}, status_code=200)
