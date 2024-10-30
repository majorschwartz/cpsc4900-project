import { useState, useEffect } from "react";
import { get_all_recipes } from "apis/explore";

const useExploreRecipes = () => {
    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await get_all_recipes();
                setRecipes(data.recipes);
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

export default useExploreRecipes;
