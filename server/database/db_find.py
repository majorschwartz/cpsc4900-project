from database.database import user_collection, preferences_collection, equipment_collection, recipe_collection

async def find_user_by_email(email: str):
    user = await user_collection.find_one({"email": email})
    return user

async def find_user_by_id(user_id: str):
    user = await user_collection.find_one({"_id": user_id})
    return user

async def find_preferences_by_user_id(user_id: str):
    preferences = await preferences_collection.find_one({"user_id": user_id})
    return preferences

async def find_equipment_by_user_id(user_id: str):
    equipment = await equipment_collection.find_one({"user_id": user_id})
    return equipment

async def find_recipe_by_user_id(user_id: str):
    recipe = await recipe_collection.find_one({"user_id": user_id})
    return recipe