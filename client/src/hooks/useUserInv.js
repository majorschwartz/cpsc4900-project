import { useState, useEffect } from "react";
import { get_inventory } from "apis/inventory";

const useUserInv = () => {
    const [inventory, setInventory] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInventory = async () => {
            setLoading(true);
            try {
                const response = await get_inventory();
                if (!response.ok) {
                    throw new Error("Failed to fetch user inventory data");
                }
                const data = await response.json();
                setInventory(data);
            } catch (error) {
                setError("Error fetching inventory data");
            } finally {
                setLoading(false);
            }
        }
        fetchInventory();
    }, []);

    return {
        inventory,
        loading,
        error,
    };
};

export default useUserInv;

