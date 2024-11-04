from openai import OpenAI
from starlette.concurrency import run_in_threadpool
from services.oai import openai_thread_client
from typing import Dict, Any
import json

client = OpenAI()


def construct_recipe_prompt(user_data: Dict[str, Any]) -> str:
    meal_type = user_data.get('meal_type')
    specific_food = user_data.get('specific_food')
    recipe_length = user_data.get('recipe_length')
    flavor = user_data.get('flavor')
    difficulty = user_data.get('difficulty')
    serving_size = user_data.get('serving_size')

    prompt = f"""You are a professional chef helping create a recipe. Please generate a detailed recipe based on the following preferences and constraints:

User Preferences:
- Meal Type: {meal_type if meal_type else "Unspecified"}
- Specific Food Request: {specific_food if specific_food else "Unspecified"}
- Recipe Length: {recipe_length if recipe_length else "Unspecified"}
- Flavor Profile: {flavor if flavor else "Unspecified"}
- Difficulty Level: {difficulty if difficulty else "Unspecified"}
- Serving Size: {serving_size if serving_size else "1"}
- Dietary Preferences: {', '.join(user_data.get('dietary_preferences', [])) if user_data.get('dietary_preferences') else "None"}
- Allergies: {', '.join(user_data.get('allergies', [])) if user_data.get('allergies') else "None"}
- Available Equipment: {', '.join(user_data.get('equipment', [])) if user_data.get('equipment') else "None"}
- Available Ingredients: {', '.join(user_data.get('inventory', [])) if user_data.get('inventory') else "None"}

Please generate a recipe in the following JSON format:
{{
    "recipe_name": string,
    "description": string,
    "meal_type": "Breakfast"|"Lunch"|"Dinner"|"Dessert",
    "prep_time": integer, # in minutes
    "cook_time": integer, # in minutes
    "total_time": integer, # in minutes
    "difficulty": "Easy"|"Intermediate"|"Advanced",
    "servings": integer,
    "ingredients": [
        {{
            "item": string,
            "amount": float,
            "unit": string, # Use the abbreviation, such as tsp, tbsp, fl oz, cup, gal, ml, l, m3, oz, lb, mg, g, kg, etc. If the amount is a whole number, use "count" as the unit.
            "system": "metric"|"imperial",
            "unit_type": "volume"|"weight"|"count",
            "notes": string|null
        }}
    ],
    "equipment_needed": [
        {{
            "item": string,
            "required": boolean,
            "substitute": string|null
        }}
    ],
    "instructions": [
        {{
            "step": integer,
            "description": string,
            "time": integer # in minutes
        }}
    ],
    "nutrition": {{
        "calories": integer,
        "protein": integer, # in grams
        "carbohydrates": integer, # in grams
        "fat": integer # in grams
    }},
    "tags": [string],
    "cuisine_type": string,
    "dietary_info": [string]
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
