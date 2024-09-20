import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Onboarding from "./pages/onboarding/Onboarding";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/auth" element={<Auth />} />
					<Route path="/onboarding" element={<Onboarding />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
