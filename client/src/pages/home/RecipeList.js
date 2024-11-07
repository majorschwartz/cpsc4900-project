import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "providers/UserContext";
import { save_recipe, remove_saved_recipe } from "apis/recipes";

const RecipeList = ({ recipes, loading, error, rel = null, onRecipeUpdate }) => {
	const navigate = useNavigate();
	const { userId } = useUserContext();

	const handleSaveRecipe = async (recipeId, e) => {
		e.stopPropagation();
		try {
			await save_recipe(recipeId);
			if (onRecipeUpdate) {
				onRecipeUpdate();
			}
		} catch (error) {
			console.error("Failed to save recipe:", error);
		}
	};

	const handleRemoveRecipe = async (recipeId, e) => {
		e.stopPropagation();
		try {
			await remove_saved_recipe(recipeId);
			if (onRecipeUpdate) {
				onRecipeUpdate();
			}
		} catch (error) {
			console.error("Failed to remove recipe:", error);
		}
	};

	if (loading)
		return <div className="text-center py-8">Loading recipes...</div>;
	if (error)
		return (
			<div className="text-center py-8 text-red-500">
				Error loading recipes: {error}
			</div>
		);
	if (!recipes?.length)
		return (
			<div className="text-center py-8 text-gray-500">
				No recipes yet. Create one!
			</div>
		);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
			{recipes.map(
				({
					_id,
					creator_id,
					creator_name,
					users_id,
					recipe: {
						recipe_name,
						description,
						difficulty,
						total_time,
						tags,
					},
				}) => {
					const isCreator = creator_id === userId;
					const hasSaved = users_id?.includes(userId);

					return (
						<div
							key={_id}
							className="bg-white relative rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
						>
							{(rel === "explore" || rel === "saved") && (
								<div
									className={`px-6 pt-3 w-full text-base flex justify-between items-center`}
								>
									<div
										className={`${
											isCreator ? "py-[3px]" : ""
										}`}
									>
										<span>Created by </span>
										<span
											className={`${
												!isCreator
													? "text-blue-500"
													: "text-gray-600"
											}`}
										>
											{isCreator
												? "you"
												: creator_name}
										</span>
									</div>
									{!isCreator && (
										hasSaved ? (
											<button
												className="border border-red-500 text-red-500 hover:bg-red-50 px-3 py-[2px] rounded-md"
												onClick={(e) =>
													handleRemoveRecipe(_id, e)
												}
											>
												Remove recipe
											</button>
										) : (
											<button
												className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-3 py-[2px] rounded-md"
												onClick={(e) =>
													handleSaveRecipe(_id, e)
												}
											>
												Save recipe
											</button>
										)
									)}
								</div>
							)}
							<div
								className="p-6 pt-3 cursor-pointer"
								onClick={() =>
									navigate(
										`/recipe/${_id}${rel ? `?rel=${rel}` : ""}`
									)
								}
							>
								<h3 className="text-xl font-semibold mb-2">
									{recipe_name}
								</h3>
								<p className="text-gray-600 mb-4 line-clamp-2">
									{description}
								</p>
								<div className="flex items-center gap-2 mb-3">
									<span
										className={`px-3 py-1 rounded-full text-sm ${
											difficulty === "Easy"
												? "bg-green-100 text-green-800"
												: difficulty === "Intermediate"
												? "bg-yellow-100 text-yellow-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{difficulty}
									</span>
									<span className="text-gray-600 text-sm">
										{total_time} minutes
									</span>
								</div>
								<div className="flex flex-wrap gap-2">
									{tags.slice(0, 3).map((tag, index) => (
										<span
											key={index}
											className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
										>
											{tag}
										</span>
									))}
									{tags.length > 3 && (
										<span className="text-gray-500 text-xs px-2 py-1">
											+{tags.length - 3} more
										</span>
									)}
								</div>
							</div>
						</div>
					);
				}
			)}
		</div>
	);
};

export default RecipeList;
