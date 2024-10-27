import React, { useEffect } from "react";
import useUserData from "hooks/useUserData";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { onboardingComplete, loading, error } = useUserData();
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) {
			return;
		}
		else if (error) {
			console.log(error);
		}
		else if (!onboardingComplete) {
			navigate("/onboarding");
		}
	}, [onboardingComplete, loading, error, navigate]);

	const handleGenerateRecipe = () => {
		navigate("/creation");
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">Welcome to PlatePal</h1>
			<div className="flex justify-center">
				<button
					onClick={handleGenerateRecipe}
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
				>
					Generate New Recipe
				</button>
			</div>
		</div>
	);
}

export default Home;
