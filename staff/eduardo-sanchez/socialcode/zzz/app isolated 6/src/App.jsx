import { useState } from 'react'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'

function App() {
  console.log('App -> render')

  const [view, setView] = useState('login')

  const handleGoToLogin = () => setView('login')

  const handleGoToHome = () => setView('home')

  const handleGoToRegister = () => setView('register')

  return <>
    {view === 'register' && <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin} />}

    {view === 'login' && <Login onUserLoggedIn={handleGoToHome} onRegisterLinkClick={handleGoToRegister} />}

    {view === 'home' && <Home />}
  </>
}

export default App