import { useState } from "react"

import "./index.css"

import Register from "./components/views/RegisterComponent"
import Login from "./components/views/LoginComponent"
import Home from "./components/views/Home"

import ViewContext from "./ViewContext"

function App() {
	const [view, setView] = useState("login")

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
