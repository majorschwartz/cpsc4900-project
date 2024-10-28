import React, { useEffect } from "react";
import useUserData from "hooks/useUserData";
import useUserRecipes from "hooks/useUserRecipes";
import RecipeList from "./RecipeList";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { onboardingComplete, loading: userLoading, error: userError } = useUserData();
	const { recipes, loading: recipesLoading, error: recipesError } = useUserRecipes();
	const navigate = useNavigate();

	useEffect(() => {
		if (userLoading) {
			return;
		}
		else if (userError) {
			console.error(userError);
			localStorage.removeItem("token");
			navigate("/auth");
		}
		else if (!onboardingComplete) {
			navigate("/onboarding");
		}
	}, [onboardingComplete, userLoading, userError, navigate]);

	const handleGenerateRecipe = () => {
		navigate("/creation");
	};

	return (
		<div className="bg-gradient-to-b from-gray-50 to-gray-100">
			<div className="container mx-auto px-4 py-12 min-h-min h-screen">
				<div className="flex flex-col items-center mb-16">
					<h1 className="flex items-center justify-center gap-4 text-5xl font-bold mb-6 text-gray-800 text-center flex-wrap">
						<span className="whitespace-nowrap">Welcome to</span>
						<img src="assets/misc/logo.png" alt="PlatePal" className="inline-block h-12" />
					</h1>
					<p className="text-gray-600 text-lg mb-8 text-center max-w-2xl">
						Your personal AI-powered recipe assistant. Generate custom recipes tailored to your preferences.
					</p>
						<button
						onClick={handleGenerateRecipe}
						className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
					>
						Generate New Recipe
					</button>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-8 mb-8">
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
