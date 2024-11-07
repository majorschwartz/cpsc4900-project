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
        "recipe.prep_time": 0,
        "recipe.cook_time": 0,
        "recipe.servings": 0,
        "recipe.ingredients": 0,
        "recipe.equipment_needed": 0,
        "recipe.instructions": 0,
        "recipe.nutrition": 0,
        "recipe.dietary_info": 0,
    }

    created_recipes = (
        await recipe_collection.find({"creator_id": user_id}, exclude_fields)
        .sort("created_at", -1)
        .to_list(length=None)
    )

    saved_recipes = (
        await recipe_collection.find(
            {"creator_id": {"$ne": user_id}, "users_id": str(user_id)}, exclude_fields
        )
        .sort("created_at", -1)
        .to_list(length=None)
    )

    return {
        "created": created_recipes if created_recipes else [],
        "saved": saved_recipes if saved_recipes else [],
    }


async def find_recipe_by_id(recipe_id: str):
    result = await recipe_collection.find_one({"_id": ObjectId(recipe_id)})
    return result if result else None


async def find_all_recipes():
    exclude_fields = {
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


async def find_all_public_recipes():
    # Find all recipes where either:
    # 1. The creator doesn't have hide_recipes set to True
    # 2. The creator has no hide_recipes field (backward compatibility)
    pipeline = [
        {
            "$lookup": {
                "from": "users",
                "localField": "creator_id",
                "foreignField": "_id",
                "as": "creator",
            }
        },
        {
            "$match": {
                "$or": [
                    {"creator.hide_recipes": {"$ne": True}},
                    {"creator.hide_recipes": {"$exists": False}},
                ]
            }
        },
        {"$project": {"creator": 0}},  # Remove the joined creator data
    ]

    result = await recipe_collection.aggregate(pipeline).to_list(None)
    return result if result else None
