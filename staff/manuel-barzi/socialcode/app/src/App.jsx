import { useState } from 'react'

import logic from './logic'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'

import Alert from './views/components/Alert'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Context } from './useContext'

function App() {
  console.log('App -> render')

  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  const handleGoToLogin = () => navigate('/login')

  const handleGoToHome = () => navigate('/')

  const handleGoToRegister = () => navigate('/register')

  const handleAlertAccepted = () => setMessage(null)

  const handleMessage = message => setMessage(message)

  return <Context.Provider value={{ alert: handleMessage }}>
    <Routes>
      <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin} />} />

      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onUserLoggedIn={handleGoToHome} onRegisterLinkClick={handleGoToRegister} />} />

      <Route path="/*" element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleGoToLogin} /> : <Navigate to="/login" />} />
    </Routes>

    {message && <Alert message={message} onAccept={handleAlertAccepted} />}
  </Context.Provider>
}

export default App
