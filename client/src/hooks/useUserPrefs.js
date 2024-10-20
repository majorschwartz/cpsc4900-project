import { useState, useEffect } from "react";
import { get_preferences } from "apis/preferences";

const useUserPrefs = () => {
    const [preferences, setPreferences] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrefs = async () => {
            setLoading(true);
            try {
                const response = await get_preferences();
                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }
                const data = await response.json();
                setPreferences(data);
            } catch (error) {
                setError("Error...");
            } finally {
                setLoading(false);
            }
        }
        fetchPrefs();
    }, []);

    return {
        preferences,
        loading,
        error,
    };
};

export default useUserPrefs;