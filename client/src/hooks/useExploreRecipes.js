import { useState, useEffect, useCallback } from "react";
import { get_all_recipes } from "apis/explore";

const useExploreRecipes = () => {
	const [recipes, setRecipes] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchRecipes = useCallback(async () => {
		try {
			const data = await get_all_recipes();
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

export default useExploreRecipes;
