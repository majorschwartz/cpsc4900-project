import React, { useState } from "react";

const Creation = () => {
	const [mealType, setMealType] = useState("");
	const [specificFood, setSpecificFood] = useState("");
	const [recipeLength, setRecipeLength] = useState("");
	const [flavor, setFlavor] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const [servingSize, setServingSize] = useState("");

	const mealTypes = ["Breakfast", "Lunch", "Dinner", "Dessert"];
	const recipeLengths = [
		"Quick (15-30 min)",
		"Medium (30-60 min)",
		"Long (60+ min)",
	];
	const flavors = ["Spicy", "Sweet", "Sour", "Savory", "Bitter"];
	const difficulties = ["Easy", "Intermediate", "Advanced"];
	const servingSizes = ["1", "2", "3", "4", "5", "6", "7+"];

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log({
			mealType,
			specificFood,
			recipeLength,
			flavor,
			difficulty,
			servingSize,
		});
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">
				Create A New Recipe
			</h1>

			<form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
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
								onClick={() => setMealType(type)}
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
								onClick={() => setRecipeLength(length)}
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
								onClick={() => setFlavor(f)}
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
								onClick={() => setDifficulty(d)}
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
						Serving Size{" "}
						<span className="text-gray-400 text-sm">
							(Optional)
						</span>
					</h2>
					<div className="grid grid-cols-4 gap-4">
						{servingSizes.map((size) => (
							<button
								key={size}
								type="button"
								onClick={() => setServingSize(size)}
								className={`p-4 border rounded-lg transition-colors duration-200 ${
									servingSize === size
										? "bg-blue-100 border-blue-500"
										: "hover:bg-gray-100"
								}`}
							>
								{size}
							</button>
						))}
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
	);
};

export default Creation;
