import { useState } from "react"

import Register from "./views/Register"
import Login from "./views/Login"
import Home from "./views/Home"

//utilizamos compo de tipo funcion usando hooks
function App() {
  console.log("App -> render")

  const [view, setView] = useState("login")

  const handleGoToLogin = () => setView("login")
  const handleGoToRegister = () => setView("register")
  const handleGoToHome = () => setView("home")
  return <>

    {view === "register" && <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin} />}

    {view === "login" && <Login onUserLoggedIn={handleGoToHome} onRegisterLinkClick={handleGoToRegister} />}

    // cambiamos a envolverlo como div ya que el main envuelve solamente el contenido principal y no toda la vista de home
    {view === "home" && <Home onUserLoggedOut={handleGoToLogin} />}

  </>
}

export default App
