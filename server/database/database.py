from motor.motor_asyncio import AsyncIOMotorClient
from config import (
    MONGO_URI,
    MONGO_DB,
    MONGO_URI_LOCAL,
    MONGO_DB_LOCAL,
    LOCAL,
)

if LOCAL:
    client = AsyncIOMotorClient(MONGO_URI_LOCAL)
    database = client[MONGO_DB_LOCAL]
else:
    client = AsyncIOMotorClient(MONGO_URI)
    database = client[MONGO_DB]

user_collection = database["users"]
preferences_collection = database["preferences"]
equipment_collection = database["equipment"]
inventory_collection = database["inventory"]
recipe_collection = database["recipes"]