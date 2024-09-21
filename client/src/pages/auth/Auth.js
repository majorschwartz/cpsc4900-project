import "./auth.css";
import { useGoogleLogin } from "@react-oauth/google";
import { google_auth } from "apis/auth";
import { useUserContext } from "providers/UserContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
	const navigate = useNavigate();

	const { setIsLoggedIn } = useUserContext();

	const googleSubmit = async (response) => {
        try {
            const res = await google_auth(response.code);
            if (!res.ok) {
                throw new Error("Google login failed.");
            }
            const data = await res.json();
            localStorage.setItem("token", data.token);
            setIsLoggedIn(true);
            console.log("Google login successful.");
            navigate("/");
        } catch (error) {
            console.error("Google login failed:", error);
        }
    };

	const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            googleSubmit(response);
        },
        onError: (response) => {
            console.log("Google login failed:", response);
        },
        flow: "auth-code",
    });

	return (
		<div className="auth-page">
			<button onClick={googleLogin}>Continue with Google</button>
		</div>
	);
}

export default Auth;