import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./providers/UserContext";
import "./index.css";
import App from "./App";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
		<UserProvider>
			<App />
		</UserProvider>
	</GoogleOAuthProvider>
);
