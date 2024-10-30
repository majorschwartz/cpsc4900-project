import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth, user, preferences, equipment, inventory, creation, recipes, explore
from config import ORIGIN_ENDPOINT

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ORIGIN_ENDPOINT],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(preferences.router)
app.include_router(equipment.router)
app.include_router(inventory.router)
app.include_router(creation.router)
app.include_router(recipes.router)
app.include_router(explore.router)
@app.get("/hello-world")
async def hello_world():
    return f"Hello, world! {random.randint(1, 1000)}"