import { useState } from 'react'

import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'

import { Routes, Route, useNavigate } from 'react-router-dom'

function App() {

  const navigate = useNavigate()

  const handleGoToLogin = () => navigate('/login')

  const handleGoToRegister = () => navigate('/Register')

  return <Routes>

    <Route path='/register' element={<Register onLoginLinkClick={handleGoToLogin} />} />

    <Route path='/login' element={<Login onRegisterLinkClick={handleGoToRegister} />} />

    <Route path='/*' element={<Home />} />

  </Routes>

}

export default App
