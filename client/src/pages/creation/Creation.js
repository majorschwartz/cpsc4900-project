import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { create_recipe } from "apis/recipes";
import Loading from "./Loading";

const Creation = () => {
	const [mealType, setMealType] = useState("");
	const [specificFood, setSpecificFood] = useState("");
	const [recipeLength, setRecipeLength] = useState("");
	const [flavor, setFlavor] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const [servingSize, setServingSize] = useState("1");
	const [loading, setLoading] = useState(false);

	const mealTypes = ["Breakfast", "Lunch", "Dinner", "Dessert"];
	const recipeLengths = [
		"Quick (15-30 min)",
		"Medium (30-60 min)",
		"Long (60+ min)",
	];
	const flavors = ["Spicy", "Sweet", "Sour", "Savory", "Bitter"];
	const difficulties = ["Easy", "Intermediate", "Advanced"];

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const recipeData = {
				meal_type: mealType,
				specific_food: specificFood,
				recipe_length: recipeLength,
				flavor: flavor,
				difficulty: difficulty,
				serving_size: parseInt(servingSize)
			};
			
			const response = await create_recipe(recipeData);
			navigate(`/recipe/${response.recipe_id}`);
		} catch (error) {
			console.error("Failed to generate recipe:", error);
			// Handle error (show error message to user)
		} finally {
			setLoading(false);
		}
	};

	const handleMealTypeClick = (type) => {
		setMealType(mealType === type ? "" : type);
	};

	const handleRecipeLengthClick = (length) => {
		setRecipeLength(recipeLength === length ? "" : length);
	};

	const handleFlavorClick = (f) => {
		setFlavor(flavor === f ? "" : f);
	};

	const handleDifficultyClick = (d) => {
		setDifficulty(difficulty === d ? "" : d);
	};

	return (
		<>
			<Loading loading={loading} />
			<div className="container max-w-3xl mx-auto px-4 py-8">
				<button
					onClick={() => navigate('/')}
					className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
				>
					<span className="mr-2">←</span> Back to Recipes
				</button>

				<h1 className="text-4xl font-bold mb-8 text-center">
					Create A New Recipe
				</h1>

				<form onSubmit={handleSubmit} className="mx-auto">
					<div className="mb-6">
						<h2 className="text-2xl font-semibold mb-2">
							Meal Type{" "}
							<span className="text-gray-400 text-sm">
								(Optional)
							</span>
						</h2>
						<div className="grid grid-cols-2 gap-4">
							{mealTypes.map((type) => (
								<button
									key={type}
									type="button"
									onClick={() => handleMealTypeClick(type)}
									className={`p-4 border rounded-lg transition-colors duration-200 ${
										mealType === type
											? "bg-blue-100 border-blue-500"
											: "hover:bg-gray-100"
									}`}
								>
									{type}
								</button>
							))}
						</div>
					</div>

					<div className="mb-6">
						<h2 className="text-2xl font-semibold mb-2">
							Specific Food{" "}
							<span className="text-gray-400 text-sm">
								(Optional)
							</span>
						</h2>
						<input
							type="text"
							value={specificFood}
							onChange={(e) => setSpecificFood(e.target.value)}
							placeholder="Enter a specific food item to generate a recipe for"
							className="w-full p-2 border rounded-lg"
						/>
					</div>

					<div className="mb-6">
						<h2 className="text-2xl font-semibold mb-2">
							Recipe Length{" "}
							<span className="text-gray-400 text-sm">
								(Optional)
							</span>
						</h2>
						<div className="grid grid-cols-3 gap-4">
							{recipeLengths.map((length) => (
								<button
									key={length}
									type="button"
									onClick={() => handleRecipeLengthClick(length)}
									className={`p-4 border rounded-lg transition-colors duration-200 ${
										recipeLength === length
											? "bg-blue-100 border-blue-500"
											: "hover:bg-gray-100"
									}`}
								>
									{length}
								</button>
							))}
						</div>
					</div>

					<div className="mb-6">
						<h2 className="text-2xl font-semibold mb-2">
							Flavor Profile{" "}
							<span className="text-gray-400 text-sm">
								(Optional)
							</span>
						</h2>
						<div className="grid grid-cols-3 gap-4">
							{flavors.map((f) => (
								<button
									key={f}
									type="button"
									onClick={() => handleFlavorClick(f)}
									className={`p-4 border rounded-lg transition-colors duration-200 ${
										flavor === f
											? "bg-blue-100 border-blue-500"
											: "hover:bg-gray-100"
									}`}
								>
									{f}
								</button>
							))}
						</div>
					</div>
					<div className="mb-6">
						<h2 className="text-2xl font-semibold mb-2">
							Difficulty{" "}
							<span className="text-gray-400 text-sm">
								(Optional)
							</span>
						</h2>
						<div className="grid grid-cols-3 gap-4">
							{difficulties.map((d) => (
								<button
									key={d}
									type="button"
									onClick={() => handleDifficultyClick(d)}
									className={`p-4 border rounded-lg transition-colors duration-200 ${
										difficulty === d
											? "bg-blue-100 border-blue-500"
											: "hover:bg-gray-100"
									}`}
								>
									{d}
								</button>
							))}
						</div>
					</div>
					<div className="mb-6">
						<h2 className="text-2xl font-semibold mb-2">
							Serving Size
						</h2>
						<div className="grid grid-cols-4 gap-4 mb-4">
							{[1, 2, 3, 4].map((size) => (
								<button
									key={size}
									type="button"
									onClick={() => setServingSize(size.toString())}
									className={`p-4 border rounded-lg transition-colors duration-200 ${
										servingSize === size.toString()
											? "bg-blue-100 border-blue-500"
											: "hover:bg-gray-100"
									}`}
								>
									{size}
								</button>
							))}
						</div>
						<div className="flex items-center">
							<input
								type="number"
								min="1"
								value={servingSize}
								onChange={(e) => setServingSize(e.target.value)}
								className="w-16 p-2 border rounded-lg mr-2"
							/>
							<span className="text-gray-600">servings</span>
						</div>
					</div>

					<button
						type="submit"
						className="w-full mt-8 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
					>
						Generate Recipe
					</button>
				</form>
			</div>
		</>
	);
};

export default Creation;
