import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const isActive = (path) => {
		return window.location.pathname === path;
	};

	const handleNavigation = (path) => {
		navigate(path);
	};

	const handleSignOut = () => {
		localStorage.removeItem("token");
		navigate("/auth");
	};

	return (
		<header className="bg-white shadow-md">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center space-x-4">
						<img
							src="/assets/misc/logo.png"
							alt="PlatePal"
							className="h-8 w-auto"
						/>
						<button
							onClick={() => handleNavigation("/creation")}
							className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 whitespace-nowrap"
						>
							Generate New Recipe
						</button>
					</div>

					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden p-2"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d={
									isMenuOpen
										? "M6 18L18 6M6 6l12 12"
										: "M4 6h16M4 12h16M4 18h16"
								}
							/>
						</svg>
					</button>

					<div className="hidden md:flex items-center space-x-4 lg:space-x-8 justify-end flex-1">
						<nav className="flex items-center space-x-4 lg:space-x-8">
							<button
								onClick={() => handleNavigation("/")}
								className={`text-gray-600 hover:text-gray-900 font-medium ${
									isActive("/") ? "text-blue-500" : ""
								}`}
							>
								Your Recipes
							</button>
							<button
								onClick={() => handleNavigation("/explore")}
								className={`text-gray-600 hover:text-gray-900 font-medium ${
									isActive("/explore") ? "text-blue-500" : ""
								}`}
							>
								Explore
							</button>
						</nav>

						<div className="flex items-center space-x-4 lg:space-x-6">
							<button
								onClick={() => handleNavigation("/profile")}
								className={`text-gray-600 hover:text-gray-900 font-medium ${
									isActive("/profile") ? "text-blue-500" : ""
								}`}
							>
								Your Profile
							</button>
							<button
								onClick={handleSignOut}
								className="text-gray-600 hover:text-gray-900 font-medium"
							>
								Sign Out
							</button>
						</div>
					</div>
				</div>

				{isMenuOpen && (
					<div className="md:hidden py-4">
						<button
							onClick={() => handleNavigation("/creation")}
							className="w-full text-left bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 mb-4"
						>
							Generate New Recipe
						</button>
						<nav className="flex flex-col space-y-4 ml-4">
							<button
								onClick={() => handleNavigation("/")}
								className={`text-gray-600 hover:text-gray-900 font-medium text-left ${
									isActive("/") ? "text-blue-500" : ""
								}`}
							>
								Your Recipes
							</button>
							<button
								onClick={() => handleNavigation("/explore")}
								className={`text-gray-600 hover:text-gray-900 font-medium text-left ${
									isActive("/explore") ? "text-blue-500" : ""
								}`}
							>
								Explore
							</button>
							<button
								onClick={() => handleNavigation("/profile")}
								className={`text-gray-600 hover:text-gray-900 font-medium text-left ${
									isActive("/profile") ? "text-blue-500" : ""
								}`}
							>
								Your Profile
							</button>
							<button
								onClick={handleSignOut}
								className="text-gray-600 hover:text-gray-900 font-medium text-left"
							>
								Sign Out
							</button>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
