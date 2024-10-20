import { useState, useEffect } from "react";
import { get_food_inventory } from "apis/inventory";

const useUserInv = () => {
    const [food, setFood] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFood = async () => {
            setLoading(true);
            try {
                const response = await get_food_inventory();
                if (!response.ok) {
                    throw new Error("Failed to fetch user food data.");
                }
                const data = await response.json();
                setFood(data);
            } catch (error) {
                setError("Error fetching food data");
            } finally {
                setLoading(false);
            }
        }
        fetchFood();
    }, []);

    return {
        food,
        loading,
        error,
    };
};

export default useUserInv;

