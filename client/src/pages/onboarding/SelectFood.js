import React, { useState } from "react";
import { set_food_inventory } from "apis/inventory";
import foodList from "./food_list";

const SelectFood = ({ stepStage }) => {
	const [selectedFood, setSelectedFood] = useState({});
	const [userAddedItems, setUserAddedItems] = useState({});
	const [newItemInputs, setNewItemInputs] = useState({});

	const toggleFood = (item, category) => {
		setSelectedFood((prev) => {
			const newFood = { ...prev };
			newFood[category] = newFood[category] || [];

			const index = newFood[category].indexOf(item.name);
			if (index > -1) {
				newFood[category].splice(index, 1);
			} else {
				newFood[category].push(item.name);
			}

			return newFood;
		});
	};

	const handleSaveFood = () => {
		const combinedFood = { ...selectedFood };
		Object.entries(userAddedItems).forEach(([category, items]) => {
			combinedFood[category] = [
				...new Set([...(combinedFood[category] || []), ...items]),
			];
		});
		set_food_inventory(combinedFood);
		stepStage();
	};

	const handleInputChange = (category, value) => {
		setNewItemInputs((prev) => ({ ...prev, [category]: value }));
	};

	const addUserItem = (category) => {
		const newItem = newItemInputs[category]?.trim();
		if (newItem && !userAddedItems[category]?.includes(newItem)) {
			setUserAddedItems((prev) => ({
				...prev,
				[category]: [...(prev[category] || []), newItem],
			}));
			setNewItemInputs((prev) => ({ ...prev, [category]: "" }));
			setSelectedFood((prev) => ({
				...prev,
				[category]: [...(prev[category] || []), newItem],
			}));
		}
	};

	const removeUserItem = (category, item) => {
		setUserAddedItems((prev) => ({
			...prev,
			[category]: prev[category].filter((i) => i !== item),
		}));
		setSelectedFood((prev) => ({
			...prev,
			[category]: prev[category].filter((i) => i !== item),
		}));
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">
				Select Food You Already Have
			</h1>

			{Object.entries(foodList).map(([category, { items }]) => (
				<div key={category} className="mb-8">
					<h2 className="text-2xl font-semibold mb-2">{category}</h2>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{items.map((item, index) => (
							<div
								key={index}
								className={`p-4 border rounded-lg cursor-pointer transition-colors duration-100 ${
									selectedFood[category]?.includes(item.name)
										? "bg-blue-100 border-blue-500"
										: "hover:bg-gray-100"
								}`}
								onClick={() => toggleFood(item, category)}
							>
								{item.imageURL && (
									<img
										src={item.imageURL}
										alt={item.name}
										className="w-full h-32 object-contain mb-2 select-none pointer-events-none"
									/>
								)}
								<p className="text-center text-sm">
									{item.name}
								</p>
							</div>
						))}
					</div>

					{/* Add new item input */}
					<div className="flex mt-4 w-96">
						<input
							type="text"
							value={newItemInputs[category] || ""}
							onChange={(e) =>
								handleInputChange(category, e.target.value)
							}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									addUserItem(category);
								}
							}}
							className="flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:border-blue-500"
							placeholder={`Add your own ${category.toLowerCase()}`}
						/>
						<button
							onClick={() => addUserItem(category)}
							className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700"
						>
							Add
						</button>
					</div>

					{/* Display user-added items */}
					{userAddedItems[category] &&
						userAddedItems[category].length > 0 && (
							<div className="flex flex-wrap gap-2 mt-4">
								{userAddedItems[category].map((item, index) => (
									<div
										onClick={() =>
											removeUserItem(category, item)
										}
										key={index}
										className="flex items-center px-4 py-2 border rounded-lg cursor-pointer transition-colors duration-100 bg-blue-100 border-blue-500 hover:bg-red-200 hover:border-red-500"
									>
										<span className="mr-2">{item}</span>
										<span className="flex items-center w-5 h-5 select-none pointer-events-none">
											<svg
												role="img"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 256 256"
												width="24px"
												height="24px"
											>
												<path
													fill="#000000"
													d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
												/>
											</svg>
										</span>
									</div>
								))}
							</div>
						)}
				</div>
			))}

			<button
				className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
				onClick={handleSaveFood}
			>
				Save Food Inventory
			</button>
		</div>
	);
};

export default SelectFood;
