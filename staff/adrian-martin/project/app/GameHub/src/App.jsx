import { useState } from 'react'

import Register from './views/Register'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { Context } from './useContext'


import './App.css'

function App() {
    console.log('App -> render')

    const [message, setMessage] = useState(null)

    const navigate = useNavigate()

    const handleGoToLogin = () => navigate('/login')

    return <>
        <Routes>
            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin} />} />
        </Routes>

    </>
}

export default App
