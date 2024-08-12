import { useState } from "react"
import logic from "./logic"

import Login from "./views/Login"
import Register from "./views/Register"
//import Home from "./views/Home"

import { Routes, Route, useNavigate, Navigate } from "react-router-dom"

function App() {
  // console.log("App -> render")

  const navigate = useNavigate()

  const handleGoToLogin = () => navigate("/login")

  const handleGoToHome = () => navigate("/")

  const handleGoToRegister = () => navigate("/register")

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center">
        <Routes>
          <Route
            path="/register"
            element={
              logic.isUserLoggedIn() ? (
                <Navigate to="/" />
              ) : (
                <Register
                  onUserRegistered={handleGoToLogin}
                  onLoginLinkClick={handleGoToLogin}
                />
              )
            }
          />

          <Route
            path="/login"
            element={
              logic.isUserLoggedIn() ? (
                <Navigate to="/" />
              ) : (
                <Login
                  onUserLoggedIn={handleGoToHome}
                  onRegisterLinkClick={handleGoToRegister}
                />
              )
            }
          />

          <Route
            path="/*"
            element={
              logic.isUserLoggedIn() ? (
                <Home onUserLoggedOut={handleGoToLogin} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
