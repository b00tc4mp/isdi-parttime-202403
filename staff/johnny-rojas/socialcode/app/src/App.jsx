import { useState } from "react"

import Register from './components/Views/Register'
import Login from './components/Views/Login'
import Home from './components/Views/Home'

function App() {

  const [view, setView] = useState('login')

  const handleGoToLogin = () => setView('login')

  const handleGoToHome = () => setView('home')

  const handleGoToRegister = () => setView('register')

  return <>
    {view === 'register' && <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin}/> }

    {view === 'login' && <Login onUserLoggedIn={handleGoToHome} onRegisterLinkClick={handleGoToRegister} />}
      
    {view === 'home' && <Home onUserLoggedOut={handleGoToLogin} />}

  </>
}

export default App
