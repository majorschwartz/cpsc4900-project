import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "components/ProtectedRoute";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import Onboarding from "./pages/onboarding/Onboarding";
import Creation from "./pages/creation/Creation";
import Recipe from "pages/recipe/Recipe";
import Explore from "pages/explore/Explore";
function App() {
	return (
		<div>
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
					<Route
						path="/explore"
						element={
							<ProtectedRoute>
								<Explore />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/creation"
						element={
							<ProtectedRoute>
								<Creation />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/recipe/:id"
						element={
							<ProtectedRoute>
								<Recipe />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
