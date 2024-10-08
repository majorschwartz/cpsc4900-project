from database.database import user_collection, preferences_collection, equipment_collection, recipe_collection


async def insert_user(user: dict):
    result = await user_collection.insert_one(user)
    return result.inserted_id
    
async def insert_preferences(user_id: str, preferences: dict):
    await preferences_collection.insert_one({"user_id": user_id, **preferences})

async def insert_equipment(user_id: str, equipment: dict):
    await equipment_collection.insert_one({"user_id": user_id, **equipment})

async def insert_recipe(user_id: str, recipe: dict):
    await recipe_collection.insert_one({"user_id": user_id, **recipe})
    
