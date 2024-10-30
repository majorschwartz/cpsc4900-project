import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "providers/UserContext";
import useUserData from "hooks/useUserData";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loginChecked } = useUserContext();
    const { onboardingComplete, loading: userLoading, error: userError } = useUserData();

    if (!loginChecked || userLoading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    if (userError) {
        localStorage.removeItem("token");
        return <Navigate to="/auth" />;
    } 
    else if (!onboardingComplete) {
        return <Navigate to="/onboarding" />;
    }

    return children;
};

export default ProtectedRoute;