import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "components/ProtectedRoute";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Onboarding from "./pages/onboarding/Onboarding";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/auth" element={<Auth />} />
					<Route
						path="/onboarding"
						element={
							<ProtectedRoute>
								<Onboarding />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
