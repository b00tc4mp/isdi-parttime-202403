import { useState } from 'react'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'
import logic from './logic'

function App() {
  console.log('App -> render')

  const [view, setView] = useState(logic.isUserLoggedIn() ? 'home' : 'login')

  const handleGoToLogin = () => setView('login')

  const handleGoToHome = () => setView('home')

  const handleGoToRegister = () => setView('register')

  return <>
    {view === 'login' && <Login onUserLoggedIn={handleGoToHome} onRegisterLinkClick={handleGoToRegister} />}

    {view === 'register' && <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin} />}

    {view === 'home' && <Home onUserLoggedOut={handleGoToLogin} />}
  </>
}

export default App