import React, { useState, useEffect } from "react";
import { set_equipment, update_equipment } from "apis/equipment";
import equipmentList from "./equip_list";

const SelectEquip = ({ equipment = {}, stepStage }) => {
	const [selectedEquipment, setSelectedEquipment] = useState(equipment || {});
	const [userAddedItems, setUserAddedItems] = useState({});
	const [newItemInputs, setNewItemInputs] = useState({});
	const [selectedAllCategories, setSelectedAllCategories] = useState({});

	useEffect(() => {
		if (!equipment) {
			return;
		}

		Object.entries(equipmentList).forEach(([category, items]) => {
			const allCategoryItems = items.map((i) => i.name);
			const allSelected = allCategoryItems.every((i) =>
				equipment[category]?.includes(i)
			);
			setSelectedAllCategories((prev) => ({
				...prev,
				[category]: allSelected,
			}));
		});
		setSelectedEquipment(equipment);
	}, [equipment]);

	const toggleEquipment = (item, category) => {
		setSelectedEquipment((prev) => {
			const newEquipment = { ...prev };
			newEquipment[category] = newEquipment[category] || [];

			const index = newEquipment[category].indexOf(item.name);
			if (index > -1) {
				newEquipment[category].splice(index, 1);
			} else {
				newEquipment[category].push(item.name);
			}

			const allCategoryItems = equipmentList[category].map((i) => i.name);
			const allSelected = allCategoryItems.every((i) =>
				newEquipment[category].includes(i)
			);
			setSelectedAllCategories((prev) => ({
				...prev,
				[category]: allSelected,
			}));

			return newEquipment;
		});
	};

	const handleSaveEquipment = async () => {
		const combinedEquipment = { ...selectedEquipment };
		Object.entries(userAddedItems).forEach(([category, items]) => {
			combinedEquipment[category] = [
				...new Set([...(combinedEquipment[category] || []), ...items]),
			];
		});

		// Check if initialEquipment exists to determine if this is an update
		if (equipment && Object.keys(equipment).length > 0) {
			await update_equipment(combinedEquipment);
		} else {
			await set_equipment(combinedEquipment);
		}
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
			setSelectedEquipment((prev) => ({
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
		setSelectedEquipment((prev) => ({
			...prev,
			[category]: prev[category].filter((i) => i !== item),
		}));
	};

	const toggleSelectAll = (category) => {
		const newSelectedAll = !selectedAllCategories[category];
		setSelectedAllCategories((prev) => ({
			...prev,
			[category]: newSelectedAll,
		}));

		const categoryItems = equipmentList[category].map((item) => item.name);
		setSelectedEquipment((prev) => ({
			...prev,
			[category]: newSelectedAll ? categoryItems : [],
		}));
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">
				Select The Equipment You Have
			</h1>

			{Object.entries(equipmentList).map(([category, items]) => (
				<div key={category} className="mb-8">
					<h2 className="text-2xl font-semibold mb-2">{category}</h2>

					<button
						onClick={() => toggleSelectAll(category)}
						className={`flex items-center px-4 py-2 rounded-md text-sm mb-4 ${
							selectedAllCategories[category]
								? "bg-blue-100 border border-blue-500 text-blue-700"
								: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
						}`}
					>
						<div
							className={`w-5 h-5 border-2 rounded mr-2 flex items-center justify-center select-none pointer-events-none ${
								selectedAllCategories[category]
									? "bg-blue-500 border-blue-500"
									: "border-gray-400"
							}`}
						>
							{selectedAllCategories[category] && (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="white"
									width="16px"
									height="16px"
								>
									<path d="M0 0h24v24H0z" fill="none" />
									<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
								</svg>
							)}
						</div>
						Select All {category}
					</button>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{items.map((item, index) => (
							<div
								key={index}
								className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
									selectedEquipment[category]?.includes(
										item.name
									)
										? "bg-blue-100 border-blue-500"
										: "hover:bg-gray-100"
								}`}
								onClick={() => toggleEquipment(item, category)}
							>
								<img
									src={item.imageURL}
									alt={item.name}
									className="w-full h-32 object-contain mb-2"
								/>
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
				onClick={handleSaveEquipment}
			>
				Save Equipment
			</button>
		</div>
	);
};

export default SelectEquip;
