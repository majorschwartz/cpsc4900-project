import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { get_recipe } from 'apis/recipes';

const Recipe = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const rel = searchParams.get('rel');
    const navigate = useNavigate();
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
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <button
                onClick={() => navigate(`${rel === "explore" ? "/explore" : "/"}`)}
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
                <span className="mr-2">←</span> Back to Recipes
            </button>

            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">{recipe.recipe_name}</h1>
            
            <div className="mb-12 bg-gray-50 p-6 rounded-lg shadow-sm">
                <p className="text-gray-700 text-lg leading-relaxed">{recipe.description}</p>
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                        <span className="block text-sm text-gray-500 uppercase tracking-wide">Prep Time</span>
                        <span className="text-lg font-medium text-gray-800">{recipe.prep_time} minutes</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                        <span className="block text-sm text-gray-500 uppercase tracking-wide">Cook Time</span>
                        <span className="text-lg font-medium text-gray-800">{recipe.cook_time} minutes</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                        <span className="block text-sm text-gray-500 uppercase tracking-wide">Total Time</span>
                        <span className="text-lg font-medium text-gray-800">{recipe.total_time} minutes</span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Ingredients</h2>
                    <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-green-600 mr-2">•</span>
                                <span>
                                    <span className="font-medium">{ingredient.amount} {ingredient.unit !== "count" ? ingredient.unit : ""}</span>
                                    {' '}{ingredient.item}
                                    {ingredient.notes && <span className="text-gray-500 italic"> ({ingredient.notes.replaceAll(".", "")})</span>}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Equipment Needed</h2>
                    <ul className="space-y-2">
                        {recipe.equipment_needed.map((equipment, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>
                                    <span>
                                        {equipment.item}
                                    </span>
                                    {equipment.substitute && equipment.substitute !== "None" && equipment.substitute !== "N/A" && (
                                        <span className="text-gray-500 italic">
                                            {' '}(or {equipment.substitute})
                                        </span>
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mb-12 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Instructions</h2>
                <ol className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                        <li key={index} className="flex">
                            <span className="font-bold text-blue-400 mr-4">{index + 1}.</span>
                            <span>
                                {instruction.description}
                                {instruction.time && (
                                    <>
                                        <br />
                                        <span className="text-gray-500 italic">({instruction.time} minutes)</span>
                                    </>
                                )}
                            </span>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Nutrition Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Calories', value: recipe.nutrition.calories },
                        { label: 'Protein', value: `${recipe.nutrition.protein}g` },
                        { label: 'Carbs', value: `${recipe.nutrition.carbohydrates}g` },
                        { label: 'Fat', value: `${recipe.nutrition.fat}g` }
                    ].map(({ label, value }) => (
                        <div key={label} className="text-center p-3 bg-gray-50 rounded-lg">
                            <span className="block text-sm text-gray-500 uppercase tracking-wide">{label}</span>
                            <span className="text-lg font-medium text-gray-800">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Recipe;
