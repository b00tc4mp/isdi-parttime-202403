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


    {view === 'login' && <Login onUserLoggin={handleGoToHome} onRegisterLinkClick={handleGoToRegister} />}


    {view === 'home' && <Home onUserLoggedOut={handleGoToLogin} />}
  </>
}

// TODO the position of the home button and the type of the password

export default App
