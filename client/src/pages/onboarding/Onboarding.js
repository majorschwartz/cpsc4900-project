import React, { useEffect, useState } from "react";
import SelectPrefs from "./SelectPrefs";
import SelectEquip from "./SelectEquip";
import SelectFood from "./SelectFood";
import useUserPrefs from "hooks/useUserPrefs";
import useUserEquip from "hooks/useUserEquip";
import useUserInv from "hooks/useUserInv";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
	const navigate = useNavigate();
	const [stage, setStage] = useState(-1);
	const { preferences, loading: loadingPrefs } = useUserPrefs();
	const { equipment, loading: loadingEquip } = useUserEquip();
	const { food, loading: loadingFood } = useUserInv();
	
	const stepStage = () => {
		if (stage !== 2) {
			setStage(stage + 1);
		} else {
			navigate("/home");
		}
	};

	useEffect(() => {
		if (loadingPrefs || loadingEquip || loadingFood) {
			return;
		} else {
			console.log(preferences, equipment, food);
			if (preferences && equipment && food) {
				navigate("/");
			} else if (!preferences) {
				setStage(0);
			} else if (!equipment) {
				setStage(1);
			} else if (!food) {
				setStage(2);
			}
		}
	}, [preferences, equipment, food, loadingPrefs, loadingEquip, loadingFood, navigate]);

	return (
		<div>
			{stage === -1 && <div>Loading...</div>}
			{stage === 0 && <SelectPrefs stepStage={stepStage} />}
			{stage === 1 && <SelectEquip stepStage={stepStage} />}
			{stage === 2 && <SelectFood stepStage={stepStage} />}
		</div>
	);
};

export default Onboarding;
