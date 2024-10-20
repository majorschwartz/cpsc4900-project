import React, { useEffect, useState } from "react";
import SelectEquip from "./SelectEquip";
import SelectPrefs from "./SelectPrefs";
import SelectFood from "./SelectFood";
import useUserPrefs from "hooks/useUserPrefs";
import useUserEquip from "hooks/useUserEquip";
import useUserFood from "hooks/useUserInv";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
	const navigate = useNavigate();
	const [stage, setStage] = useState(0);
	const { preferences, loading: loadingPrefs } = useUserPrefs();
	const { equipment, loading: loadingEquip } = useUserEquip();
	const { food, loading: loadingFood } = useUserFood();
	const stepStage = () => {
		setStage(stage + 1);
	};

	useEffect(() => {
		if (loadingPrefs || loadingEquip || loadingFood) {
			return;
		} else {
			if (preferences && equipment) {
				navigate("/home");
			} else if (!preferences) {
				setStage(0);
			} else if (!equipment) {
				setStage(1);
			} else if (preferences && equipment) {
				setStage(2);
			}
		}
	}, [preferences, equipment, loadingPrefs, loadingEquip, navigate]);

	return (
		<div>
			{stage === 0 && <SelectPrefs stepStage={stepStage} />}
			{stage === 1 && <SelectEquip stepStage={stepStage} />}
			{stage === 2 && <SelectFood stepStage={stepStage} />}
		</div>
	);
};

export default Onboarding;
