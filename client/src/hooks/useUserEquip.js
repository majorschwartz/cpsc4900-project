import { useState, useEffect } from "react";
import { get_equipment } from "apis/equipment";

const useUserEquip = () => {
    const [equipment, setEquipment] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEquip = async () => {
            setLoading(true);
            try {
                const response = await get_equipment();
                if (!response.ok) {
                    throw new Error("Failed to fetch user equipment");
                }
                const data = await response.json();
                setEquipment(data);
            } catch (error) {
                setError("Error fetching user equipment");
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