import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/HomePage";
import RequireAuth from "./redux/features/auth/RequireAuth";
import Logout from "./pages/auth/Logout";
import MyProfileView from "./pages/MyProfileViewPage";
import UserProfileView from "./pages/UserProfileViewPage";
import ProfilesList from "./components/common/ProfilesList";
import { useProfileMeQuery } from "@/redux/features/profiles/profileApiSlice";

const socket = io(import.meta.env.VITE_BACKEND_URL);

const App = () => {
    const { data: meData } = useProfileMeQuery();

    useEffect(() => {
        if (meData?.userProfile) {
            socket.emit("profileOnline", meData.userProfile._id);
        }

        return () => {
            if (meData?.userProfile) {
                socket.emit("profileLogout", meData.userProfile._id);
            }
        };
    }, [meData]);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
                <Route path="/profile" element={<RequireAuth><MyProfileView /></RequireAuth>} />
                <Route path="/profile/:profile_id" element={<RequireAuth><UserProfileView /></RequireAuth>} />
                <Route path="/profile_list" element={<RequireAuth><ProfilesList /></RequireAuth>} />
            </Routes>
        </Router>
    );
};

export default App;
