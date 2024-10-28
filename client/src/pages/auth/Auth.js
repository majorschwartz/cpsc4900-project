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
		<div className="relative min-h-screen">
			{/* Background Layer */}
			<div 
				className="absolute inset-0"
				style={{ 
					backgroundImage: 'url("assets/misc/backdrop.png")',
					backgroundSize: '600px',
					backgroundRepeat: 'repeat',
					backgroundPosition: '-20px 50px',
					opacity: 0.2
				}}
			/>
			
			{/* Content Layer */}
			<div className="relative flex flex-col items-center justify-center min-h-screen">
				<div className="w-full max-w-md p-8 space-y-8 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border-2 border-white">
					<img 
						src="assets/misc/chef.png" 
						alt="logo" 
						className="h-32 md:h-64 mx-auto" 
					/>
					<div className="text-center">
						<h2 className="mt-6 text-3xl font-bold text-gray-900">
							Welcome Back!
						</h2>
						<p className="mt-4 text-base text-gray-600">
							Please sign in to continue
						</p>
					</div>
					
					<button
						onClick={googleLogin}
						className="w-full flex items-center justify-center gap-3 px-4 py-3 text-gray-700 
								 transition-colors duration-200 bg-white border border-gray-300 rounded-lg
								 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						<img 
							src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
							alt="Google logo" 
							className="w-5 h-5"
						/>
						<span className="font-medium">Continue with Google</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Auth;
