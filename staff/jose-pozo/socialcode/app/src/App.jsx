import { useState } from 'react'

import logic from './logic/index'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'

function App() {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : 'login')

  const handleGoToLogin = () => setView('login')

  const handleGoHome = () => setView('home')

  const handleGoToRegister = () => setView('register')

  return <>
    {view === 'register' && <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin} />}

    {view === 'login' && <Login onUsserLoggedIn={handleGoHome} onRegisterLinkClick={handleGoToRegister} />}

    {view === 'home' && <Home onUserLoggedOut={handleGoToLogin} />}
  </>
}

export default App

