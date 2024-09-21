import React, { useEffect, useState } from "react";
import useUserPrefs from "hooks/useUserPrefs";
import useUserEquip from "hooks/useUserEquip";
import { set_preferences } from "apis/preferences";
import { set_equipment } from "apis/equipment";

const Onboarding = () => {
	const [stage, setStage] = useState(0);
	const { preferences, loading: loadingPrefs } = useUserPrefs();
	const { equipment, loading: loadingEquip } = useUserEquip();
	const [newPreferences, setNewPreferences] = useState([]);
	const [newEquipment, setNewEquipment] = useState([]);

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
			Onboarding
			{loadingPrefs && loadingEquip && <div>Loading...</div>}
			{preferences && <div>Preferences: {preferences.join(", ")}</div>}
		</div>
	);
}

export default Onboarding;