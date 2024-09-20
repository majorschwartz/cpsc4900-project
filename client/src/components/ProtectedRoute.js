import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "providers/UserContext";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loginChecked } = useUserContext();

    if (!loginChecked) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return <Navigate to="/auth" />;
    }

    return children;
};

export default ProtectedRoute;