from database.database import user_collection, preferences_collection, equipment_collection, inventory_collection, recipe_collection

async def update_preferences(user_id: str, preferences: dict):
    await preferences_collection.update_one({"user_id": user_id}, {"$set": preferences})

async def update_equipment(user_id: str, equipment: dict):
    await equipment_collection.update_one({"user_id": user_id}, {"$set": equipment})

async def update_inventory(user_id: str, inventory: dict):
    await inventory_collection.update_one({"user_id": user_id}, {"$set": inventory})

async def update_recipe(user_id: str, recipe: dict):
    await recipe_collection.update_one({"user_id": user_id}, {"$set": recipe})