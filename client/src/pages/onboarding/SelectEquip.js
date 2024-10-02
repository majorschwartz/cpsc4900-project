import React, { useState } from "react";
import { set_equipment } from "apis/equipment";

const EquipmentSection = ({ title, items, selectedItems, onItemToggle }) => (
	<div className="mb-8">
		<h2 className="text-xl font-semibold mb-4">{title}</h2>
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{items.map((item) => (
				<button
					key={item}
					className={`p-2 rounded-md ${
						selectedItems.includes(item)
							? "bg-blue-500 text-white"
							: "bg-gray-200 text-gray-800"
					}`}
					onClick={() => onItemToggle(item)}
				>
					{item}
				</button>
			))}
		</div>
	</div>
);

const SelectEquip = () => {
	const equipment = {
		knives: [],
		pots: [],
		bowls: [],
		basicItems: [],
		measuringCups: [],
	};

	const [selectedEquipment, setSelectedEquipment] = useState({
		knives: [],
		pots: [],
		bowls: [],
		basicItems: [],
		measuringCups: [],
	});

	const handleItemToggle = (category, item) => {
		setSelectedEquipment((prev) => {
			const updatedCategory = prev[category].includes(item)
				? prev[category].filter((i) => i !== item)
				: [...prev[category], item];
			return { ...prev, [category]: updatedCategory };
		});
	};

	const handleSubmit = async () => {
		try {
			const response = await set_equipment(selectedEquipment);
			if (response.ok) {
				console.log("Equipment saved successfully");
				// Add any success handling here (e.g., redirect or show a success message)
			} else {
				console.error("Failed to save equipment");
				// Add error handling here
			}
		} catch (error) {
			console.error("Error saving equipment:", error);
			// Add error handling here
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">
				Select Your Cooking Equipment
			</h1>

			<EquipmentSection
				title="Knives"
				items={equipment.knives}
				selectedItems={selectedEquipment.knives}
				onItemToggle={(item) => handleItemToggle("knives", item)}
			/>

			<EquipmentSection
				title="Pots and Pans"
				items={equipment.pots}
				selectedItems={selectedEquipment.pots}
				onItemToggle={(item) => handleItemToggle("pots", item)}
			/>

			<EquipmentSection
				title="Bowls"
				items={equipment.bowls}
				selectedItems={selectedEquipment.bowls}
				onItemToggle={(item) => handleItemToggle("bowls", item)}
			/>

			<EquipmentSection
				title="Basic Items"
				items={equipment.basicItems}
				selectedItems={selectedEquipment.basicItems}
				onItemToggle={(item) => handleItemToggle("basicItems", item)}
			/>

			<EquipmentSection
				title="Measuring Cups"
				items={equipment.measuringCups}
				selectedItems={selectedEquipment.measuringCups}
				onItemToggle={(item) => handleItemToggle("measuringCups", item)}
			/>

			<button
				className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
				onClick={handleSubmit}
			>
				Save Equipment
			</button>
		</div>
	);
};

export default SelectEquip;
