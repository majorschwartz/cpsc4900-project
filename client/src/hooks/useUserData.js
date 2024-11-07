import { useState, useEffect } from "react";
import { get_user, update_user_privacy } from "apis/user";

const useUserData = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [hideRecipes, setHideRecipes] = useState(false);
    const [onboardingComplete, setOnboardingComplete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await get_user();
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const data = await response.json();
            setFirstName(data["first_name"]);
            setLastName(data["last_name"]);
            setEmail(data["email"]);
            setHideRecipes(data["hide_recipes"] || false);
            setOnboardingComplete(data["onboarding_complete"]);
        } catch (error) {
            setError("Error fetching user data");
        } finally {
            setLoading(false);
        }
    };

    const updateHideRecipes = async (value) => {
        try {
            const response = await update_user_privacy(value);
            if (!response.ok) {
                throw new Error("Failed to update privacy settings");
            }
            setHideRecipes(value);
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        firstName,
        lastName,
        email,
        hideRecipes,
        onboardingComplete,
        loading,
        error,
        updateHideRecipes,
    };
};

export default useUserData;
