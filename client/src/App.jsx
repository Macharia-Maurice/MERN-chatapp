import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./redux/features/auth/RequireAuth";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path="/login"
					element={<Login />}
				/>
				<Route
					path="/logout"
					element={<Logout />}
				/>
				<Route
					path="/register"
					element={<Register />}
				/>
				<Route
					path="/dashboard"
					element={
						<RequireAuth>
							<Dashboard />
						</RequireAuth>
					}
				/>
				<Route
					path="/profile"
					element={
						<RequireAuth>
							<Profile />
						</RequireAuth>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
