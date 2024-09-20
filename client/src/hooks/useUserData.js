import { useState, useEffect } from "react";
import { useUserContext } from "providers/UserContext";
import { get_user } from "utils/api";

const useUserData = () => {
    const { isLoggedIn } = useUserContext();
    const [uid, setUid] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [email, setEmail] = useState("");

    const [onboardingComplete, setOnboardingComplete] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            setLoading(true);
            try {
                const response = await get_user();
                if (!response.ok) {
                    throw new Error("Failed to fetch user data.");
                }
                const data = await response.json();
                setUid(data["uid"].toString());
                setFirstName(data["first_name"]);
                setLastName(data["last_name"]);
                setEmail(data["email"]);
                setOnboardingComplete(data["onboarding_complete"]);
            } catch (error) {
                setError("Error...");
            } finally {
                setLoading(false);
            }
        };

        if (isLoggedIn) {
            getUserData();
        }
    }, [isLoggedIn]);

    return {
        uid,
        firstName,
        lastName,
        email,
        onboardingComplete,
        loading,
        error,
    };
};

export default useUserData;
