#!/bin/bash

# Build frontend
cd /app/client
npm install
npm run build

# Start backend using $PORT
cd /app
uvicorn app:app --host 0.0.0.0 --port $PORT --workers 1