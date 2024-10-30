import React, { useEffect, useState } from "react";
import { update_onboarding } from "apis/inventory";
import SelectPrefs from "./SelectPrefs";
import SelectEquip from "./SelectEquip";
import SelectFood from "./SelectFood";
import useUserData from "hooks/useUserData";
import useUserPrefs from "hooks/useUserPrefs";
import useUserEquip from "hooks/useUserEquip";
import useUserInv from "hooks/useUserInv";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
	const navigate = useNavigate();
	const [stage, setStage] = useState(-1);
	const { onboardingComplete, loading: loadingUser, error } = useUserData();
	const { preferences, loading: loadingPrefs } = useUserPrefs();
	const { equipment, loading: loadingEquip } = useUserEquip();
	const { inventory, loading: loadingInv } = useUserInv();
	
	const stepStage = () => {
		window.scrollTo(0, 0);
		if (stage !== 2) {
			setStage(stage + 1);
		} else {
			navigate("/");
		}
	};

	useEffect(() => {
		if (loadingPrefs || loadingEquip || loadingInv || loadingUser) {
			return;
		} else if (error) {
			console.log(error);
		} else {
			if (onboardingComplete) {
				navigate("/");
			} else if (preferences && equipment && inventory) {
				update_onboarding();
				navigate("/");
			} else if (!preferences) {
				setStage(0);
			} else if (!equipment) {
				setStage(1);
			} else if (!inventory) {
				setStage(2);
			}
		}
	}, [preferences, equipment, inventory, loadingPrefs, loadingEquip, loadingInv, loadingUser, error, onboardingComplete, navigate]);

	return (
		<div>
			{stage === -1 && <div>Loading...</div>}
			{stage === 0 && <SelectPrefs preferences={preferences} stepStage={stepStage} />}
			{stage === 1 && <SelectEquip equipment={equipment} stepStage={stepStage} />}
			{stage === 2 && <SelectFood inventory={inventory} stepStage={stepStage} />}
		</div>
	);
};

export default Onboarding;
