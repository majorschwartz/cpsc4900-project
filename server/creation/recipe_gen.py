from openai import OpenAI
from starlette.concurrency import run_in_threadpool
from services.oai import openai_thread_client
from typing import Dict, Any
import json

client = OpenAI()


def construct_recipe_prompt(user_data: Dict[str, Any]) -> str:
    prompt = f"""You are a professional chef helping create a recipe. Please generate a detailed recipe based on the following preferences and constraints:

User Preferences:
- Meal Type: {user_data.get('meal_type', 'Any')}
- Specific Food Request: {user_data.get('specific_food', 'None')}
- Recipe Length: {user_data.get('recipe_length', 'Any')}
- Flavor Profile: {user_data.get('flavor', 'Any')}
- Difficulty Level: {user_data.get('difficulty', 'Any')}
- Serving Size: {user_data.get('serving_size', '1')}
- Dietary Preferences: {', '.join(user_data.get('dietary_preferences', [])) if user_data.get('dietary_preferences') else None}
- Allergies: {', '.join(user_data.get('allergies', [])) if user_data.get('allergies') else None}
- Available Equipment: {', '.join(user_data.get('equipment', [])) if user_data.get('equipment') else None}
- Available Ingredients: {', '.join(user_data.get('inventory', [])) if user_data.get('inventory') else None}

Please generate a recipe in the following JSON format:
{{
    "recipe_name": "string",
    "description": "string",
    "prep_time": "string",
    "cook_time": "string",
    "total_time": "string",
    "difficulty": "string",
    "servings": "integer",
    "ingredients": [
        {{
            "item": "string",
            "amount": "number",
            "unit": "string",
            "unit_type": "volume|weight|count",
            "notes": "string"
        }}
    ],
    "equipment_needed": [
        {{
            "item": "string",
            "required": "boolean",
            "substitute": "string|None"
        }}
    ],
    "instructions": [
        {{
            "step": "integer",
            "description": "string",
            "time": "string",
        }}
    ],
    "nutrition": {{
        "calories": "number",
        "protein": {{ "amount": "number", "unit": "g" }},
        "carbohydrates": {{ "amount": "number", "unit": "g" }},
        "fat": {{ "amount": "number", "unit": "g" }}
    }},
    "tags": ["string"],
    "cuisine_type": "string",
    "dietary_info": ["string"]
}}

Ensure all measurements are precise and the recipe is detailed and easy to follow. Include any temperature information in the instructions."""

    return prompt


async def generate_recipe(user_preferences: Dict[str, Any]) -> Dict[str, Any]:
    try:
        prompt = construct_recipe_prompt(user_preferences)

        response = await run_in_threadpool(
            openai_thread_client.do_chat_completion,
            system_content="You are a professional chef with extensive experience in recipe creation.",
            user_content=prompt,
            temperature=0.7,
            max_tokens=2000,
            json=True,
        )

        recipe_json = json.loads(response.choices[0].message.content)
        return recipe_json

    except Exception as e:
        print(f"Error generating recipe: {str(e)}")
        raise Exception("Failed to generate recipe")
