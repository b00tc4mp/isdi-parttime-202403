import { useState } from "react"
import Register from "./views/Register.jsx"
import Login from "./views/Login.jsx"
import Home from "./views/Home.jsx"

import logic from "./logic"

function App() {
  console.log("App -> paint")

  const [view, setView] = useState(logic.isUserLoggedIn() ? "home" : "login")

  const handleGoToLogin = () => setView("login")

  const handleGoToHome = () => setView("home")

  const handleGoToRegister = () => setView("register")

  return (
    <>
      {view === "register" && (
        <Register
          onUserRegistered={handleGoToLogin}
          onLoginLinkClick={handleGoToLogin}
        />
      )}
      {view === "login" && (
        <Login
          onUserLoggedIn={handleGoToHome}
          onRegisterLinkClick={handleGoToRegister}
        />
      )}
      {view === "home" && <Home onUserLoggedOut={handleGoToLogin} />}
    </>
  )
}

export default App
