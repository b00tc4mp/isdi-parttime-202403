import { useState } from 'react'
import logic from './logic'

import './global.css'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Register from './views/Register'
import Home from './views/Home'
import { Notfound } from './views/Notfound'
import { Login } from './views/Login'
import Header from './views/components/Header/Header'
// import AdList from './views/components/AdList/AdList.jsx'

function App() {
  console.log('App -> render')

  // const navigate = useNavigate()

  //  const handleGoToLogin = () => navigate('/login')

  // const handleGoToHome = () => navigate('/')

  // const handleGoToRegister = () => navigate('/register')

  return (
    <>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/adlist" element={<AdList />} /> */}

        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App

// < Routes >
//   <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onUserRegistered={handleGoToLogin} onLoginLinkClick={handleGoToLogin} />} />


//   <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onUserLoggedIn={handleGoToHome} onRegisterLinkClick={handleGoToRegister} />} />

//   <Route path="/*" element={logic.isUserLoggedIn() ? <Home onUserLoggedOut={handleGoToLogin} /> : <Navigate to="/login" />} />  </Routes >

