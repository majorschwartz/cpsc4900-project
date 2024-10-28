import { useState, useEffect } from "react";
import { get_recipes } from "apis/recipes";

const useUserRecipes = () => {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await get_recipes();
                if (!response.ok) {
                    throw new Error("Failed to fetch user recipes.");
                }
                const data = await response.json();
                setRecipes(data["recipes"]);
            } catch (error) {
                setError("Error fetching recipes");
            } finally {
                setLoading(false);
            }
        }
        fetchRecipes();
    }, []);

    return {
        recipes,
        loading,
        error,
    };
};

export default useUserRecipes;

