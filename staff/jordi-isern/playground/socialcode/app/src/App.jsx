import { useState } from 'react'
import './global.css'
import './App.css'
import logic from './logic'

import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import Home from './views/home/Home.jsx'


function App () {
  console.log('App -> virtual dom')
  
const [view, setView] = useState(logic.isUserLoggedIn()?'home' : 'login')

  const handleGoToLogin = ()=> setView('login')

  const handleGoHome = () => setView('home')

  const handleGoRegister = () => setView('register')
 
    return( <>{
      view ==='login' && <Login onUserLoggedin={handleGoHome} onClickRegister={handleGoRegister}></Login>
    }
    {view ==='register' && <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin}/>
  }
  {view === 'home' && <Home onUserLoggedOut={handleGoToLogin}/>}
    </>)
}

export default App
