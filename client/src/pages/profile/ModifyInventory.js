import React from "react";
import { useNavigate } from "react-router-dom";
import SelectFood from "../onboarding/SelectFood";
import Header from "components/Header";
import useUserInv from "hooks/useUserInv";

const ModifyInventory = () => {
	const navigate = useNavigate();
	const { inventory, loading, error } = useUserInv();

	const handleStepStage = () => {
		navigate("/profile");
	};

	if (!loading && error) {
		return <div>Error finding inventory</div>;
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
				<SelectFood inventory={inventory} stepStage={handleStepStage} />
			</div>
		</div>
	);
};

export default ModifyInventory;
