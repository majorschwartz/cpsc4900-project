import React, { useEffect } from "react";
import useUserData from "hooks/useUserData";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { onboardingComplete, loading, error } = useUserData();
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) {
			return;
		}
		else if (error) {
			console.log(error);
		}
		else if (!onboardingComplete) {
			navigate("/onboarding");
		}
	}, [onboardingComplete, loading, error, navigate]);

	return (
		<div>
			This is the home page
		</div>
	);
}

export default Home;