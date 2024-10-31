import React from "react";
import useUserRecipes from "hooks/useUserRecipes";
import useUserData from "hooks/useUserData";
import RecipeList from "./RecipeList";
import Header from "components/Header";
import { Navigate } from "react-router-dom";

const Home = () => {
	const { recipes, loading: recipesLoading, error: recipesError } = useUserRecipes();
	const { onboardingComplete, firstName, loading: userLoading, error: userError } = useUserData();

	if (userError) {
        localStorage.removeItem("token");
        return <Navigate to="/auth" />;
    }

	if (!userLoading && !onboardingComplete) {
		return <Navigate to="/onboarding" />;
	}

	return (
		<div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
			<Header />
			<div className="container mx-auto px-4 py-8">
				<div className="bg-white rounded-xl shadow-lg p-8">
					<h2 className="text-3xl font-semibold mb-8 text-gray-800 border-b pb-4">
						{firstName ? `${firstName}'s` : "Your"} Recipes
					</h2>
					{recipes && (
						<RecipeList
							recipes={recipes}
							loading={recipesLoading}
							error={recipesError}
							rel="main"
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Home;
