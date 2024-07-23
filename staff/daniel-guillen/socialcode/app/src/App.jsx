import { useState } from 'react'

import logic from './logic'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

function App() {
  console.log('App -> render')

  const navigate = useNavigate()

  const handleGoToLogin = () => navigate('/login')

  const handleGoToHome = () => navigate('/')

  const handleGoToRegister = () => navigate('/register')

  return <Routes>
    <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin} />} />

    <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onUserLoggedIn={handleGoToHome} onRegisterLinkClick={handleGoToRegister} />} />

    <Route path="/*" element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleGoToLogin} /> : <Navigate to="/login" />} />
    </Routes>
}

export default App
