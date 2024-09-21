import { useState, useEffect } from "react";
import { get_equipment } from "apis/equipment";

const useUserEquip = () => {
    const [equipment, setEquipment] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEquip = async () => {
            setLoading(true);
            try {
                const response = await get_equipment();
                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }
                const data = await response.json();
                setEquipment(data["equipment"]);
            } catch (error) {
                setError("Error...");
            } finally {
                setLoading(false);
            }
        }
        fetchEquip();
    }, []);

    return {
        equipment,
        loading,
        error,
    };
};

export default useUserEquip;