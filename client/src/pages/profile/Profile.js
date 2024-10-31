import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useUserData from "hooks/useUserData";
import Header from "components/Header";

const Profile = () => {
	const navigate = useNavigate();
	const { firstName, email, loading, error } = useUserData();

	const handlePreferencesClick = () => {
		navigate("/preferences");
	};

	const handleEquipmentClick = () => {
		navigate("/equipment");
	};

	const handleInventoryClick = () => {
		navigate("/inventory");
	};

	if (!loading && error) {
		localStorage.removeItem("token");
		return <Navigate to="/auth" />;
	}

	return (
		<div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
			<Header />
			<div className="container mx-auto px-4 py-8">
				<div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
					<h2 className="text-3xl font-semibold mb-8 text-gray-800 border-b pb-4">
						{firstName ? `${firstName}'s` : "Your"} Profile
					</h2>

					<div className="space-y-6">
						<div>
							<h3 className="text-lg font-medium text-gray-900">
								Account Information
							</h3>
							<div className="mt-4 bg-gray-50 p-4 rounded-lg">
								<div className="flex items-center space-x-2 text-gray-600">
									<svg
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										className="h-5 w-5"
									>
										<path
											fill="#000000"
											d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
										/>
									</svg>

									<span>{email}</span>
								</div>
								<div className="mt-2 flex items-center space-x-2 text-gray-600">
									<img
										src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
										alt="Google"
										className="h-5 w-5"
									/>
									<span>Signed in with Google</span>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-medium text-gray-900">
								Customize Your Experience
							</h3>
							<div className="mt-4 grid grid-cols-1 gap-4">
								<button
									onClick={handlePreferencesClick}
									className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
								>
									<span className="font-medium">
										Update Preferences
									</span>
									<svg
										className="h-5 w-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</button>

								<button
									onClick={handleEquipmentClick}
									className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
								>
									<span className="font-medium">
										Update Equipment
									</span>
									<svg
										className="h-5 w-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</button>

								<button
									onClick={handleInventoryClick}
									className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
								>
									<span className="font-medium">
										Update Inventory
									</span>
									<svg
										className="h-5 w-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
