import React, { useEffect, useState } from "react";
import SelectEquip from "./SelectEquip";
import SelectPrefs from "./SelectPrefs";
import useUserPrefs from "hooks/useUserPrefs";
import useUserEquip from "hooks/useUserEquip";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
	const navigate = useNavigate();
	const [stage, setStage] = useState(0);
	const { preferences, loading: loadingPrefs } = useUserPrefs();
	const { equipment, loading: loadingEquip } = useUserEquip();

	const stepStage = () => {
		setStage(stage + 1);
	};

	useEffect(() => {
		if (loadingPrefs || loadingEquip) {
			return;
		} else {
			if (preferences && equipment) {
				navigate("/home");
			} else if (!preferences) {
				setStage(0);
			} else if (!equipment) {
				setStage(1);
			}
		}
	}, [preferences, equipment, loadingPrefs, loadingEquip, navigate]);

	return (
		<div>
			{stage === 0 && <SelectPrefs stepStage={stepStage} />}
			{stage === 1 && <SelectEquip stepStage={stepStage} />}
		</div>
	);
};

export default Onboarding;
