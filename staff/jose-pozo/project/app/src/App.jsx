import { Routes, Route, Navigate } from 'react-router-dom'
import { UserProfileProvider } from './contexts/UserProfileProvider'

import { useState } from 'react'
import { Context } from './UseContext'

import Alert from './views/components/Alert/Alert'

import logic from './logic/index.js'

import Login from './views/Login/Login.jsx'
import Register from './views/Register/Register.jsx'
import Home from './views/Home/Home'


function App() {

  const [message, setMessage] = useState(null)
  const handleMessage = (message) => setMessage(message)
  const handleAlertAccepted = () => setMessage(null)

  return (
    <>
      <Context.Provider value={{ alert: handleMessage }}>

        <Routes>

          <Route path='/register' element={<RenderRegister />} />

          <Route path='/login' element={<RenderLogin />} />

          <Route path='/*' element={<RenderHome />} />

        </Routes>

        {message && <Alert message={message} onAccept={handleAlertAccepted} />}

      </Context.Provider>
    </>
  )


}

export default App

const RenderHome = () => (logic.isUserLoggedIn() ? <UserProfileProvider><Home /></UserProfileProvider> : <Navigate to='/login' />)
const RenderLogin = () => (logic.isUserLoggedIn() ? <Navigate to='/' /> : <Login />)
const RenderRegister = () => (logic.isUserLoggedIn() ? <Navigate to='/' /> : <Register />)
