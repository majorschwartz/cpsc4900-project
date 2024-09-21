import React, { useEffect, useState } from "react";
import SelectEquip from "./SelectEquip";
import SelectPrefs from "./SelectPrefs";
import useUserPrefs from "hooks/useUserPrefs";
import useUserEquip from "hooks/useUserEquip";

const Onboarding = () => {
	const [stage, setStage] = useState(0);
	const { preferences, loading: loadingPrefs } = useUserPrefs();
	const { equipment, loading: loadingEquip } = useUserEquip();

	useEffect(() => {
		if (loadingPrefs || loadingEquip) {
			return;
		}
		if (preferences !== null && equipment === null) {
			setStage(1);
		}
		if (equipment !== null && preferences !== null) {
			setStage(2);
		}
	}, [preferences, equipment, loadingPrefs, loadingEquip]);
	
	return (
		<div>
			{stage === 0 && <SelectPrefs />}
			{stage === 1 && <SelectEquip />}
		</div>
	);
}

export default Onboarding;