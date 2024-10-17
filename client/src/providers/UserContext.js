import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loginChecked, setLoginChecked] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		let isValid = false;

		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				if (decodedToken.exp < Date.now() / 1000) {
					localStorage.removeItem("token");
				} else {
					isValid = true;
				}
			} catch (e) {
				console.error(e);
			}
		}
		setIsLoggedIn(isValid);
		setLoginChecked(true);
	}, []);

	return (
		<UserContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, loginChecked }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
