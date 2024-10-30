import asyncio
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
from utils.decorators import token_required
from database.db_find import (
    find_preferences_by_user_id,
    find_equipment_by_user_id,
    find_inventory_by_user_id,
)
from creation.recipe_gen import generate_recipe
from database.db_insert import insert_recipe

router = APIRouter()


class RecipeRequest(BaseModel):
    meal_type: Optional[str] = None
    specific_food: Optional[str] = None
    recipe_length: Optional[str] = None
    flavor: Optional[str] = None
    difficulty: Optional[str] = None
    serving_size: Optional[int] = 1


@router.post("/creation")
@token_required
async def create_recipe(request: Request, recipe_request: RecipeRequest):
    skip_and_wait = False
    if skip_and_wait:
        await asyncio.sleep(30)
        return JSONResponse(
            content={"message": "Recipe created successfully", "recipe_id": "123"},
            status_code=200,
        )

    try:
        current_user = request.state.current_user
        user_id = current_user["_id"]

        # Gather all user data
        preferences = await find_preferences_by_user_id(user_id)
        equipment = await find_equipment_by_user_id(user_id)
        inventory = await find_inventory_by_user_id(user_id)

        if not all([preferences, equipment, inventory]):
            raise HTTPException(
                status_code=400, detail="Missing user data. Please complete onboarding."
            )

        # Combine all data for recipe generation
        recipe_data = {
            "meal_type": recipe_request.meal_type,
            "specific_food": recipe_request.specific_food,
            "recipe_length": recipe_request.recipe_length,
            "flavor": recipe_request.flavor,
            "difficulty": recipe_request.difficulty,
            "serving_size": recipe_request.serving_size,
            "dietary_preferences": preferences.get("Dietary", []),
            "allergies": preferences.get("Allergies", []),
            "equipment": [item for category in equipment.values() for item in category],
            "inventory": [item for category in inventory.values() for item in category],
        }

        # Generate recipe
        generated_recipe = await generate_recipe(recipe_data)

        # Save recipe to database
        recipe_id = await insert_recipe(user_id, generated_recipe)

        return JSONResponse(
            content={"message": "Recipe created successfully", "recipe_id": str(recipe_id)},
            status_code=200,
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
