# PlatePal

PlatePal is an AI-powered recipe generation and management application that creates personalized recipes based on your preferences, available ingredients, and kitchen equipment.

## Features

- **AI Recipe Generation**: Create custom recipes tailored to your:
  - Meal type preferences
  - Available ingredients
  - Kitchen equipment
  - Dietary restrictions
  - Cooking skill level
  - Time constraints
  - Serving size needs

- **Recipe Management**:
  - Save and organize your generated recipes
  - Explore recipes created by other users
  - Save recipes from other users to your collection

- **Personalized Experience**:
  - Customizable food preferences
  - Dietary restrictions management
  - Kitchen equipment inventory
  - Ingredient inventory tracking

- **User-Friendly Interface**:
  - Clean, modern design
  - Mobile-responsive layout
  - Intuitive navigation
  - Detailed recipe views with step-by-step instructions

## Technology Stack

### Frontend
- React.js
- Tailwind CSS
- Google OAuth integration
- JWT authentication

### Backend
- FastAPI (Python)
- MongoDB
- OpenAI API integration
- JWT token-based authentication

## Getting Started

### Prerequisites
- Node.js
- Python 3.8+
- MongoDB
- OpenAI API key
- Google OAuth credentials

### Installation

1. Clone the repository
```bash
git clone https://github.com/majorschwartz/cpsc4900-project/
```

2. Install frontend dependencies
```bash
cd client
npm install
```

3. Install backend dependencies
```bash
cd server
pip install -r requirements.txt
```

4. Set up environment variables

Create `.env` files in both client and server directories:

Client `.env`:
```bash
REACT_APP_API_ENDPOINT=http://localhost:8000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

Server `.env`:
```bash
ORIGIN_ENDPOINT=http://localhost:3000
APP_SECRET_KEY=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
MONGO_URI=your_mongodb_uri
MONGO_DB=your_database_name
```

5. Start the development servers

Frontend:
```bash
cd client
npm start
```

Backend:
```bash
cd server
uvicorn app:app --reload
```