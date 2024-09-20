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