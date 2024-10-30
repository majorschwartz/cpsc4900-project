import React from "react";
import { useNavigate } from "react-router-dom";
import SelectPrefs from "../onboarding/SelectPrefs";
import Header from "components/Header";
import useUserPrefs from "hooks/useUserPrefs";

const ModifyPreferences = () => {
    const navigate = useNavigate();
    const { preferences, loading, error } = useUserPrefs();

    const handleStepStage = () => {
        navigate("/profile");
    };

	if (!loading && error) {
		return <div>Error finding preferences</div>
	}

    return (
        <div className="bg-white min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <button
                    onClick={() => navigate('/profile')}
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <span className="mr-2">←</span> Back to Profile
                </button>
                <SelectPrefs preferences={preferences} stepStage={handleStepStage} />
            </div>
        </div>
    );
};

export default ModifyPreferences; 