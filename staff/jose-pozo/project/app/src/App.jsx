import { Routes, Route, Navigate } from 'react-router-dom'
import { UserProfileProvider } from './contexts/UserProfileProvider'

import logic from './logic/index.js'

import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home/Home'


function App() {



  return <Routes>

    <Route path='/register' element={<RenderRegister />} />

    <Route path='/login' element={<RenderLogin />} />

    <Route path='/*' element={<RenderHome />} />

  </Routes>
}

export default App

const RenderHome = () => (logic.isUserLoggedIn() ? <UserProfileProvider><Home /></UserProfileProvider> : <Navigate to='/login' />)
const RenderLogin = () => (logic.isUserLoggedIn() ? <Navigate to='/' /> : <Login />)
const RenderRegister = () => (logic.isUserLoggedIn() ? <Navigate to='/' /> : <Register />)
