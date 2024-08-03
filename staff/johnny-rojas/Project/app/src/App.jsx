import { useState } from 'react'

import Home from './components/Views/pages/Home'
import Login from './components/Views/pages/Login'
import Register from './components/Views/pages/Register'
import { Routes, Route } from 'react-router-dom'

import './App.css'

function App() {

  return <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
  </Routes>

}

export default App
