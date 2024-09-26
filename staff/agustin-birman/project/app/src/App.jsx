import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Alert from './components/library/Alert'
import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'
import logic from './logic'
import './global.css'
import { Context } from './useContext'
import { useState } from 'react'

function App() {
    const [message, setMessage] = useState(null)

    const navigate = useNavigate()

    const handleGoToLogin = () => navigate('/login')

    const handleGoToHome = () => navigate('/')

    const handleGoToRegister = () => navigate('/register')
    const handleAlertAccepted = () => setMessage(null)

    const handleMessage = message => setMessage(message)


    return <Context.Provider value={{ alert: handleMessage }}>
        <Routes>
            <Route path='/login' element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Login onUserLoggedIn={handleGoToHome} onRegisterLinkClick={handleGoToRegister} />} />

            <Route path='/register' element={logic.isUserLoggedIn() ? <Navigate to='/' /> : <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin} />} />

            <Route path='/*' element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleGoToLogin} /> : <Navigate to='/login' />} />
        </Routes>
        {message && <Alert message={message} onAccept={handleAlertAccepted} />}
    </Context.Provider>

}

export default App