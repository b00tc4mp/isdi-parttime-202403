import { useState } from "react"

//import Register from "./views/Register"
import Login from "./views/Login"
import Register from "./views/Register"
//import Home from "./views/Home"

// import { Routes, Route, useNavigate, Navigate } from "react-router-dom"

function App() {
  // console.log("App -> render")

  // const [message, setMessage] = useState(null)

  // const navigate = useNavigate()

  // const handleGoToLogin = () => navigate("/login")

  // const handleGoToHome = () => navigate("/")

  // const handleGoToRegister = () => navigate("/register")

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center">
        <Register />
      </div>
    </div>
  )
}

export default App
