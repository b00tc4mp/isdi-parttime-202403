import { useState } from "react"

import "./index.css"

import Register from "./components/views/RegisterComponent"
import Login from "./components/views/LoginComponent"
import Home from "./components/views/Home"

function App() {
	const [view, setView] = useState("login")

	const handleGoToLogin = () => setView("login")

	const handleGoToHome = () => setView("home")

	const handleGoToRegister = () => setView("register")

	return (
		<>
			{view === "register" && <Register onLoginLinkClick={handleGoToLogin} onUserRegistered={handleGoToLogin} />}

			{view === "login" && <Login onRegisterLinkClick={handleGoToRegister} onUserLoggedIn={handleGoToHome} />}

			{view === "home" && <Home onUserLoggedOut={handleGoToLogin} />}
		</>
	)
}
export default App
