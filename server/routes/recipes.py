from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from utils.decorators import token_required
from database.db_find import find_recipe_by_id
from bson import ObjectId

router = APIRouter()

@router.get("/recipes/{recipe_id}")
@token_required
async def get_recipe(request: Request, recipe_id: str):
    try:
        current_user = request.state.current_user
        recipe = await find_recipe_by_id(ObjectId(recipe_id))
        
        if not recipe:
            raise HTTPException(status_code=404, detail="Recipe not found")
            
        if recipe["user_id"] != current_user["_id"]:
            raise HTTPException(status_code=403, detail="Not authorized to view this recipe")
            
        return JSONResponse(content=recipe, status_code=200)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

