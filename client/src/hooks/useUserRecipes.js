import { useState, useEffect, useCallback } from "react";
import { get_recipes } from "apis/recipes";

const useUserRecipes = () => {
    const [recipes, setRecipes] = useState({ created: [], saved: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecipes = useCallback(async () => {
        try {
            const response = await get_recipes();
            if (!response.ok) {
                throw new Error("Failed to fetch user recipes.");
            }
            const data = await response.json();
            setRecipes(data.recipes);
        } catch (error) {
            setError("Error fetching recipes");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    return {
        recipes,
        loading,
        error,
        refetchRecipes: fetchRecipes
    };
};

export default useUserRecipes;

