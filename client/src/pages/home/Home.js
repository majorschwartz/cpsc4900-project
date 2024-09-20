import React, { useEffect } from "react";
import useUserData from "hooks/useUserData";
import { useNavigate } from "react-router-dom";

const Home = () => {

	const { onboardingComplete } = useUserData();
	const navigate = useNavigate();

	useEffect(() => {
		if (!onboardingComplete) {
			navigate("/onboarding");
		}
	}, [onboardingComplete, navigate]);

	return (
		<div>
			This is the home page
		</div>
	);
}

export default Home;