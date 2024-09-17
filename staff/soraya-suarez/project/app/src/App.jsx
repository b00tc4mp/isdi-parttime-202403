import { useState } from 'react'

import logic from './logic'

import Login from './views/Login'
import Home from './views/Home'

import Alert from './views/components/Alert'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Context } from './useContext'

function App() {
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  const handleGoToLogin = () => navigate('/login')
  const handleGoToHome = () => navigate('/')

  const handleAlertAccepted = () => setMessage(null)

  const handleMessage = message => setMessage(message)

  return <Context.Provider value={{ alert: handleMessage }}>
    <Routes>
      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/home" /> : <Login onUserLoggedIn={handleGoToHome} />} />
      <Route path="/*" element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleGoToLogin} /> : <Navigate to="/login" />} />
    </Routes>

    {message && <Alert message={message} onAccept={handleAlertAccepted} />}
  </Context.Provider>
}

export default App
