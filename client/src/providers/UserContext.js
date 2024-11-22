import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loginChecked, setLoginChecked] = useState(false);
	const [userId, setUserId] = useState(null);
	const [firstName, setFirstName] = useState(null);
	const [email, setEmail] = useState(null);

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
				setUserId(decodedToken.user_id);
				setFirstName(decodedToken.first_name);
				setEmail(decodedToken.email);
			} catch (e) {
				console.error(e);
			}
		}
		setIsLoggedIn(isValid);
		setLoginChecked(true);
	}, [isLoggedIn]);

	return (
		<UserContext.Provider
			value={{ isLoggedIn, setIsLoggedIn, loginChecked, userId, firstName, email }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
