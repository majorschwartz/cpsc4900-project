# syntax=docker/dockerfile:1

# Build stage
FROM --platform=linux/amd64 node:20 as build
WORKDIR /app
COPY client/ ./client/
RUN rm client/.env
RUN rm client/.env.production.local
RUN cd client && npm install && npm run build

# Runtime stage
FROM --platform=linux/amd64 python:3.12.3-slim
WORKDIR /app

# Copy server files
COPY server/ ./server/

# Copy built client files from build stage
COPY --from=build /app/client/build/ ./client/build/

# Install Python dependencies
RUN pip3 install -r server/requirements.txt

# Expose port
EXPOSE $PORT

# Start command
CMD cd server && uvicorn app:app --host 0.0.0.0 --port $PORT --workers 1
