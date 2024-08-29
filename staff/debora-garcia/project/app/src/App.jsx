import { Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"

import { Context } from "./useContext"

import logic from "./logic"
import Login from "./views/Login"
import Register from "./views/Register"
import Home from "./views/Home"

import Alert from "./views/.components/Alert"
import "./global.css"

export default function App() {
    console.log("App -> render")

    const [message, setMessage] = useState(null)

    const handleAlertAccepted = () => setMessage(null)
    const handleMessage = message => setMessage(message)

    return <Context.Provider value={{ alert: handleMessage }}>
        <Routes>
            <Route path="/login" element={<RenderLogin />} />

            <Route path="/register" element={<RenderRegister />} />

            <Route path="/*" element={<RenderHome />} />
        </Routes>

        {message && <Alert message={message} onAccept={handleAlertAccepted} />}
    </Context.Provider>
}

const RenderRegister = () => (logic.isUserLoggedIn() ? <Navigate to="/workouts" /> : <Register />)
const RenderLogin = () => (logic.isUserLoggedIn() ? <Navigate to="/workouts" /> : <Login />)
const RenderHome = () => (logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />)
