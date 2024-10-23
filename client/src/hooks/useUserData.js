import { useState, useEffect } from "react";
import { get_user } from "apis/user";

const useUserData = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [email, setEmail] = useState("");

    const [onboardingComplete, setOnboardingComplete] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
                setOnboardingComplete(data["onboarding_complete"]);
            } catch (error) {
                setError("Error fetching user data");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return {
        firstName,
        lastName,
        email,
        onboardingComplete,
        loading,
        error,
    };
};

export default useUserData;
