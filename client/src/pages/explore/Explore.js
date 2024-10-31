import React, { useState } from "react";
import useExploreRecipes from "hooks/useExploreRecipes";
import Header from "components/Header";
import RecipeList from "../home/RecipeList";

const Explore = () => {
	const { recipes, loading, error } = useExploreRecipes();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedFilters, setSelectedFilters] = useState({
		difficulty: "",
		mealType: "",
		cuisine: "",
	});

	const filteredRecipes = recipes?.filter((recipe) => {
		const matchesSearch =
			recipe.recipe.recipe_name
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			recipe.recipe.description
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			recipe.recipe.tags.some((tag) =>
				tag.toLowerCase().includes(searchTerm.toLowerCase())
			);

		const matchesDifficulty =
			!selectedFilters.difficulty ||
			recipe.recipe.difficulty === selectedFilters.difficulty;
		const matchesMealType =
			!selectedFilters.mealType ||
			recipe.recipe.meal_type === selectedFilters.mealType;
		const matchesCuisine =
			!selectedFilters.cuisine ||
			recipe.recipe.cuisine_type === selectedFilters.cuisine;

		return (
			matchesSearch &&
			matchesDifficulty &&
			matchesMealType &&
			matchesCuisine
		);
	});

	const getUniqueDifficulties = () => {
		return [...new Set(recipes?.map((r) => r.recipe.difficulty) || [])];
	};

	const getUniqueMealTypes = () => {
		return [...new Set(recipes?.map((r) => r.recipe.meal_type) || [])];
	};

	const getUniqueCuisines = () => {
		return [...new Set(recipes?.map((r) => r.recipe.cuisine_type) || [])];
	};

	return (
		<div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
			<Header />
			<div className="container mx-auto px-4 py-8">
				<div className="bg-white rounded-xl shadow-lg p-8">
					<h2 className="text-3xl font-semibold mb-6 text-gray-800">
						Explore Recipes
					</h2>

					<div className="mb-8 relative">
						<input
							type="text"
							placeholder="Search recipes..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200"
						/>
						<svg
							className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
						<div className="relative">
							<select
								value={selectedFilters.difficulty}
								onChange={(e) =>
									setSelectedFilters((prev) => ({
										...prev,
										difficulty: e.target.value,
									}))
								}
								className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200 bg-white"
							>
								<option value="">All Difficulties</option>
								{getUniqueDifficulties().map((difficulty) => (
									<option key={difficulty} value={difficulty}>
										{difficulty}
									</option>
								))}
							</select>
							<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
								<svg
									className="h-5 w-5 text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						</div>

						<div className="relative">
							<select
								value={selectedFilters.mealType}
								onChange={(e) =>
									setSelectedFilters((prev) => ({
										...prev,
										mealType: e.target.value,
									}))
								}
								className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200 bg-white"
							>
								<option value="">All Meal Types</option>
								{getUniqueMealTypes().map((mealType) => (
									<option key={mealType} value={mealType}>
										{mealType}
									</option>
								))}
							</select>
							<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
								<svg
									className="h-5 w-5 text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						</div>

						<div className="relative">
							<select
								value={selectedFilters.cuisine}
								onChange={(e) =>
									setSelectedFilters((prev) => ({
										...prev,
										cuisine: e.target.value,
									}))
								}
								className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200 bg-white"
							>
								<option value="">All Cuisines</option>
								{getUniqueCuisines().map((cuisine) => (
									<option key={cuisine} value={cuisine}>
										{cuisine}
									</option>
								))}
							</select>
							<div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
								<svg
									className="h-5 w-5 text-gray-400"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
						</div>
					</div>

					<RecipeList
						recipes={filteredRecipes}
						loading={loading}
						error={error}
						rel="explore"
					/>
				</div>
			</div>
		</div>
	);
};

export default Explore;
