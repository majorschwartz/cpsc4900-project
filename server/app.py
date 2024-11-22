import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import RedirectResponse
from routes import auth, user, preferences, equipment, inventory, creation, recipes, explore
from config import ORIGIN_ENDPOINT
import os

app = FastAPI()

class HTTPSRedirectMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Check if we're already on HTTPS or using Heroku's proxy
        proto = request.headers.get('x-forwarded-proto', '')
        if proto == 'https':
            return await call_next(request)
            
        # If not HTTPS, redirect
        if request.url.scheme == 'http':
            url = str(request.url)
            url = url.replace('http://', 'https://', 1)
            return RedirectResponse(url=url, status_code=301)
            
        return await call_next(request)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ORIGIN_ENDPOINT],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(user.router, prefix="/api")
app.include_router(preferences.router, prefix="/api")
app.include_router(equipment.router, prefix="/api")
app.include_router(inventory.router, prefix="/api")
app.include_router(creation.router, prefix="/api")
app.include_router(recipes.router, prefix="/api")
app.include_router(explore.router, prefix="/api")

client_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "client", "build")
app.mount("/static", StaticFiles(directory=os.path.join(client_path, "static")), name="static")

@app.get("/hello-world")
async def hello_world():
    return f"Hello, world! {random.randint(1, 1000)}"

@app.get("/assets/{path:path}")
async def serve_assets(path: str):
    asset_path = os.path.join(client_path, "assets", path)
    if os.path.exists(asset_path):
        return FileResponse(asset_path)
    return {"message": "Asset not found"}

@app.get("/{full_path:path}")
async def serve_spa(full_path: str):
    file_path = os.path.join(client_path, "index.html")
    if os.path.exists(file_path):
        return FileResponse(file_path)
    return {"message": "Not found"}