import React, { useState } from "react";
import { set_equipment } from "apis/equipment";
import equipmentList from "./equip_list";

const SelectEquip = () => {
	const [selectedEquipment, setSelectedEquipment] = useState([]);

	const toggleEquipment = (item) => {
		setSelectedEquipment((prev) =>
			prev.includes(item.name)
				? prev.filter((i) => i !== item.name)
				: [...prev, item.name]
		);
		console.log(selectedEquipment);
	};

	const handleSaveEquipment = () => {
		set_equipment(selectedEquipment);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8 text-center">
				Select The Equipment You Have
			</h1>

			{Object.entries(equipmentList).map(([category, items]) => (
				<div key={category} className="mb-8">
					<h2 className="text-2xl font-semibold mb-4">{category}</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{items.map((item, index) => (
							<div
								key={index}
								className={`p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
									selectedEquipment.includes(item.name)
										? "bg-blue-100 border-blue-500"
										: "hover:bg-gray-100"
								}`}
								onClick={() => toggleEquipment(item)}
							>
								<img
									src={item.imageURL}
									alt={item.name}
									className="w-full h-32 object-contain mb-2"
								/>
								<p className="text-center text-sm">{item.name}</p>
							</div>
						))}
					</div>
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
