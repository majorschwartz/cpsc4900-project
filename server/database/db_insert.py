from database.database import (
    user_collection,
    preferences_collection,
    equipment_collection,
    inventory_collection,
    recipe_collection,
)
import datetime


async def insert_user(user: dict):
    result = await user_collection.insert_one(user)
    return result.inserted_id


async def insert_preferences(user_id: str, preferences: dict):
    await preferences_collection.insert_one(
        {"user_id": user_id, "preferences": preferences}
    )


async def insert_equipment(user_id: str, equipment: dict):
    await equipment_collection.insert_one({"user_id": user_id, "equipment": equipment})


async def insert_inventory(user_id: str, inventory: dict):
    await inventory_collection.insert_one({"user_id": user_id, "inventory": inventory})


async def insert_recipe(user_id: str, creator_name: str, recipe: dict):
    recipe_result = await recipe_collection.insert_one(
        {
            "creator_id": user_id,
            "creator_name": creator_name,
            "users_id": [str(user_id)],
            "created_at": datetime.datetime.now(datetime.UTC),
            "recipe": recipe,
        }
    )
    return str(recipe_result.inserted_id)
