import { useState } from 'react'

import logic from './logic.js'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'





function App() {
  console.log('App -> render')

  const [view, setView] = useState(logic.isUserLoggedIn() ? 'Home' : 'Login')

  const handleGoToLogin = () => setView('Login')

  const handleGoToRegister = () => setView('Register')

  const handleGoToHome = () => setView('Home')

  return <>
    {view === 'Register' && <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin} />}

    {view === 'Login' && <Login onUserLoggedIn={handleGoToHome} onRegisterLinkClick={handleGoToRegister} />}


    {
      view === 'Home' && <Home onUserLoggedOut={handleGoToLogin} />
    }
  </>
}

export default App
