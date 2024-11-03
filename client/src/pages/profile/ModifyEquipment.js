import React from "react";
import { useNavigate } from "react-router-dom";
import SelectEquip from "../onboarding/SelectEquip";
import Header from "components/Header";
import useUserEquip from "hooks/useUserEquip";

const ModifyEquipment = () => {
	const navigate = useNavigate();
	const { equipment, loading, error } = useUserEquip();

	const handleStepStage = () => {
		navigate("/profile");
	};

	if (!loading && error) {
		return <div>Error finding equipment</div>;
	}

	return (
		<div className="bg-white min-h-screen">
			<Header />
			<div className="container mx-auto px-4 py-8">
				<button
					onClick={() => navigate("/profile")}
					className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
				>
					<span className="mr-2">←</span> Back to Profile
				</button>
				<SelectEquip
					equipment={equipment}
					stepStage={handleStepStage}
				/>
			</div>
		</div>
	);
};

export default ModifyEquipment;
