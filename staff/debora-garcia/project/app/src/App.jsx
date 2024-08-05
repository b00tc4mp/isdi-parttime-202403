import { Routes, Route, useNavigate, Navigate } from "react-router-dom"

import logic from "./logic";

import Login from "./views/Login";
import Register from "./views/Register";
import Workouts from "./views/Workouts";
import Achievements from "./views/Achievements";
import Feed from "./views/Feed";

export default function App() {
    console.log("App -> render")
    const navigate = useNavigate()

    const handleGoToLogin = () => navigate("/login")
    const handleGoToRegister = () => navigate("/register")
    const handleGoToFeed = () => navigate("/feed")
    const handleGoToWorkouts = () => navigate("/workouts")
    const handleGoToAchievements = () => navigate("/achievements")
    return <Routes>

        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/workouts" /> : <Login />} />

        <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/workouts" /> : <Register />} />

        <Route path="/feed" element={logic.isUserLoggedIn() ? <Feed onUserLoggedOut={handleGoToLogin} /> : <Navigate to="/login" />} />

        <Route path="/workouts" element={logic.isUserLoggedIn() ? <Workouts onUserLoggedOut={handleGoToLogin} /> : <Navigate to="/login" />} />

        <Route path="/achievements" element={logic.isUserLoggedIn() ? <Achievements onUserLoggedOut={handleGoToLogin} /> : <Navigate to="/login" />} />

    </Routes>
}

