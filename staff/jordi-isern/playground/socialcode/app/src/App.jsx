import { useState } from 'react'
import './styles.css'
import './App.css'
import logic from './logic'

import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import Home from './views/home/Home.jsx'

import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'


function App () {
  console.log('App -> virtual dom')
  
const [view, setView] = useState(logic.isUserLoggedIn()?'home' : 'login')

  const handleGoToLogin = ()=> setView('login')

  const handleGoHome = () => setView('home')

  const handleGoRegister = () => setView('register')
 
    return( <Routes>
      <Route path ="/register" element={logic.isUserLoggedIn() ? <Navigate to="/"/>: <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin} />} />

      <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/"/> :<Login onUserLoggedIn={handleGoHome} onClickRegister={handleGoRegister} />}  />

      <Route path="/*" element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleGoToLogin}/> : <Navigate to="/login"/>} />
  </Routes>)
}

export default App
