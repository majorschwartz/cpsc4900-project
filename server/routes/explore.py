from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from utils.decorators import token_required
from database.db_find import find_all_public_recipes
from utils.helpers import convertObjectIds

router = APIRouter()

@router.get("/explore")
@token_required
async def get_all_recipes(request: Request):
    try:
        recipes = await find_all_public_recipes()
        
        if not recipes:
            return JSONResponse(content={"recipes": []}, status_code=200)
            
        recipes = await convertObjectIds(recipes)
        # Sort recipes by created_at in descending order (newest first)
        recipes.sort(key=lambda x: x['created_at'], reverse=True)
        return JSONResponse(content={"recipes": recipes}, status_code=200)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))