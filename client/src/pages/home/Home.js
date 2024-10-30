import React from "react";
import useUserRecipes from "hooks/useUserRecipes";
import RecipeList from "./RecipeList";
import Header from "components/Header";

const Home = () => {
	const { recipes, loading: recipesLoading, error: recipesError } = useUserRecipes();

	return (
		<div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
			<Header />
			<div className="container mx-auto px-4 py-8">
				<div className="bg-white rounded-xl shadow-lg p-8">
					<h2 className="text-3xl font-semibold mb-8 text-gray-800 border-b pb-4">
						Your Recipes
					</h2>
					<RecipeList 
						recipes={recipes} 
						loading={recipesLoading} 
						error={recipesError} 
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
