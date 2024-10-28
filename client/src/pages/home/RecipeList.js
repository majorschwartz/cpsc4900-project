import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeList = ({ recipes, loading, error }) => {
    const navigate = useNavigate();

    if (loading) return <div className="text-center py-8">Loading recipes...</div>;
    if (error) return <div className="text-center py-8 text-red-500">Error loading recipes: {error}</div>;
    if (!recipes?.length) return <div className="text-center py-8 text-gray-500">No recipes yet. Generate your first recipe!</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
                <div 
                    key={recipe._id}
                    onClick={() => navigate(`/recipe/${recipe._id}`)}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
                >
                    <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{recipe.recipe.recipe_name}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{recipe.recipe.description}</p>
                        
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                                recipe.recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                recipe.recipe.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {recipe.recipe.difficulty}
                            </span>
                            <span className="text-gray-600 text-sm">
                                {recipe.recipe.total_time} minutes
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {recipe.recipe.tags.slice(0, 3).map((tag, index) => (
                                <span 
                                    key={index}
                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                >
                                    {tag}
                                </span>
                            ))}
                            {recipe.recipe.tags.length > 3 && (
                                <span className="text-gray-500 text-xs px-2 py-1">
                                    +{recipe.recipe.tags.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
