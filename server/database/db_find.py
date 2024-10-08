from database.database import user_collection, preferences_collection, equipment_collection, recipe_collection

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

async def find_recipes_by_user_id(user_id: str):
	result = await recipe_collection.find_one({"user_id": user_id})
	return result["recipes"] if result else None