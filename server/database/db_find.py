from database.database import (
    user_collection,
    preferences_collection,
    equipment_collection,
    inventory_collection,
    recipe_collection,
)
from bson import ObjectId


async def find_user_by_email(email: str):
    user = await user_collection.find_one({"email": email})
    return user if user else None


async def find_user_by_id(user_id: str):
    user = await user_collection.find_one({"_id": user_id})
    return user if user else None


async def find_preferences_by_user_id(user_id: str):
    result = await preferences_collection.find_one({"user_id": user_id})
    return result["preferences"] if result else None


async def find_equipment_by_user_id(user_id: str):
    result = await equipment_collection.find_one({"user_id": user_id})
    return result["equipment"] if result else None


async def find_inventory_by_user_id(user_id: str):
    result = await inventory_collection.find_one({"user_id": user_id})
    return result["inventory"] if result else None


async def find_recipes_by_user_id(user_id: str):
    exclude_fields = {
        "users_id": 0,
        "recipe.prep_time": 0,
        "recipe.cook_time": 0,
        "recipe.servings": 0,
        "recipe.ingredients": 0,
        "recipe.equipment_needed": 0,
        "recipe.instructions": 0,
        "recipe.nutrition": 0,
        "recipe.dietary_info": 0,
    }
    result = (
        await recipe_collection.find({"creator_id": user_id}, exclude_fields)
        .sort("created_at", -1)
        .to_list(length=None)
    )
    return result if result else None


async def find_recipe_by_id(recipe_id: str):
    result = await recipe_collection.find_one({"_id": ObjectId(recipe_id)})
    return result if result else None


async def find_all_recipes():
    exclude_fields = {
        "users_id": 0,
        "recipe.prep_time": 0,
        "recipe.cook_time": 0,
        "recipe.servings": 0,
        "recipe.ingredients": 0,
        "recipe.equipment_needed": 0,
        "recipe.instructions": 0,
        "recipe.nutrition": 0,
        "recipe.dietary_info": 0,
    }
    result = (
        await recipe_collection.find({}, exclude_fields)
        .sort("created_at", -1)
        .to_list(length=None)
    )
    return result if result else None
