import { Routes, Route, Navigate } from "react-router-dom"

import logic from "./logic";

import Login from "./views/Login";
import Register from "./views/Register";

import Home from "./views/Home";
import './global.css'

export default function App() {
    console.log("App -> render")

    return <Routes>

        <Route path="/login" element={<RenderLogin />} />

        <Route path="/register" element={<RenderRegister />} />

        <Route path="/*" element={<RenderHome />} />
        
    </Routes>
}

const RenderRegister = () => (logic.isUserLoggedIn() ? <Navigate to="/workouts" /> : <Register />)
const RenderLogin = () => (logic.isUserLoggedIn() ? <Navigate to="/workouts" /> : <Login />)
const RenderHome = () => (logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />)
