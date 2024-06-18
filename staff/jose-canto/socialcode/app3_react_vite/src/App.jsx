import { useState } from "react"

import "./index.css"

import logic from "./logic"

import Register from "./components/views/RegisterComponent"
import Login from "./components/views/LoginComponent"
import Home from "./components/views/Home"

import ViewContext from "./ViewContext"

function App() {
	const [view, setView] = useState(logic.isUserLoggedIn() ? "home" : "login") // Vemos si el usuario ya ha iniciado sesión y lo redirijimos a la vista home o al login

	// const handleGoToLogin = () => setView("login")

	// const handleGoToHome = () => setView("home")

	// const handleGoToRegister = () => setView("register")

	return (
		<>
			<ViewContext.Provider value={{ view, setView }}>
				{view === "register" && <Register />}

				{view === "login" && <Login />}

				{view === "home" && <Home />}
			</ViewContext.Provider>
		</>
	)
}
export default App
