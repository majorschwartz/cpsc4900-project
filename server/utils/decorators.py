from functools import wraps
from fastapi import Request, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from jwt import decode, ExpiredSignatureError, InvalidTokenError
from config import LOCAL, MONGO_URI_LOCAL, MONGO_DB_LOCAL, MONGO_URI, MONGO_DB, SECRET_KEY

if LOCAL:
    client = AsyncIOMotorClient(MONGO_URI_LOCAL)
    database = client[MONGO_DB_LOCAL]
else:
    client = AsyncIOMotorClient(MONGO_URI)
    database = client[MONGO_DB]

user_collection = database["users"]

def token_required(func):
    @wraps(func)
    async def decorated(request: Request, *args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or not token.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Token is missing or invalid!")

        try:
            # Remove "Bearer " prefix
            token = token.split(" ")[1]
            # Decode the token
            data = decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = await user_collection.find_one({'email': data['email']})
            if not current_user:
                raise HTTPException(status_code=401, detail="User not found!")
        except ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired!")
        except InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token!")
        except Exception as e:
            raise HTTPException(status_code=401, detail="Token is missing or invalid!")

        # Attach current_user to request state
        request.state.current_user = current_user
        return await func(request, *args, **kwargs)

    return decorated