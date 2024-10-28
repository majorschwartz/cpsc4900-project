import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { get_recipe } from 'apis/recipes';

const Recipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await get_recipe(id);
                setRecipe(data.recipe);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!recipe) return <div>Recipe not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">{recipe.recipe_name}</h1>
            
            <div className="mb-8">
                <p className="text-gray-600">{recipe.description}</p>
                <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                        <span className="font-semibold">Prep Time:</span> {recipe.prep_time}
                    </div>
                    <div>
                        <span className="font-semibold">Cook Time:</span> {recipe.cook_time}
                    </div>
                    <div>
                        <span className="font-semibold">Total Time:</span> {recipe.total_time}
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                <ul className="list-disc pl-5">
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {ingredient.amount} {ingredient.unit} {ingredient.item}
                            {ingredient.notes && <span className="text-gray-600"> ({ingredient.notes})</span>}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                <ol className="list-decimal pl-5">
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index} className="mb-4">
                            {instruction.description}
                            {instruction.time && <span className="text-gray-600"> ({instruction.time})</span>}
                            {instruction.temperature.value && (
                                <span className="text-gray-600">
                                    {` at ${instruction.temperature.value}°${instruction.temperature.unit}`}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Nutrition Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <span className="font-semibold">Calories:</span> {recipe.nutrition.calories}
                    </div>
                    <div>
                        <span className="font-semibold">Protein:</span> {recipe.nutrition.protein.amount}g
                    </div>
                    <div>
                        <span className="font-semibold">Carbs:</span> {recipe.nutrition.carbohydrates.amount}g
                    </div>
                    <div>
                        <span className="font-semibold">Fat:</span> {recipe.nutrition.fat.amount}g
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recipe;

