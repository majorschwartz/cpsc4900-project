from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import HTTPException
from utils.decorators import token_required

router = APIRouter()

@router.post("/creation")
@token_required
async def create_recipe(request: Request):
    current_user = request.state.current_user
    
	# TODO: Add logic to create recipe

    return JSONResponse(content={"message": "Recipe created successfully"}, status_code=200)