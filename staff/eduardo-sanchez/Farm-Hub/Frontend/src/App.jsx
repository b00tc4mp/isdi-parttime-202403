import { useState } from 'react'
import logic from './logic'

import './global.css'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import Register from './views/Register'
import Home from './views/Home'
import { Notfound } from './views/Notfound'
import { Login } from './views/Login'

import { CreateAdForm } from './views/components/CreateAdForm/CreateAdForm'
import AdPage from './views/AdPage/AdPage'
import { UpdateAdForm } from './views/UpdateApForm/UpdateAdForm'
import { MyAccount } from './views/MyAccount'
import { MyAds } from './views/MyAds'

function App() {
  console.log('App -> render')

  const navigate = useNavigate()

  // const handleGoToLogin = () => navigate('/login')

  // const handleGoToHome = () => navigate('/')

  // const handleGoToRegister = () => navigate('/register')

  return (
    <>
      <Routes>
        <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />
        <Route path="/" element={logic.isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />
        <Route path="/*" element={<Notfound />} />

        <Route path="/createad" element={<CreateAdForm />}></Route>
        <Route path="/adpage/:adId" element={<AdPage />}></Route>
        <Route path="updateadform/:adId" element={<UpdateAdForm />}></Route>

        <Route path="/myaccount/:userId" element={<MyAccount />}></Route>

        <Route path="/myads/:userId" element={<MyAds />}></Route>

      </Routes>
    </>
  )
}

export default App



