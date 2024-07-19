import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import RequireAuth from "./redux/features/auth/RequireAuth";
import Logout from "./pages/auth/Logout";
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
					path="/home"
					element={
						<RequireAuth>
							<Home />
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
				<Route
					path="/chat"
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
