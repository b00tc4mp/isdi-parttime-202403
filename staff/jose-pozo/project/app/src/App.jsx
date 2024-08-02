import { Routes, Route, navigate } from 'react-router-dom'

import logic from './logic/index.js'

import Login from './views/Login'
import Register from './views/Register'
import Home from './views/Home'



function App() {

  return <Routes>

    <Route path='/register' element={<RenderRegister />} />

    <Route path='/login' element={<RenderLogin />} />

    <Route path='/*' element={<RenderHome />} />

  </Routes>

}

export default App

const RenderHome = () => (logic.isUserLoggedIn() ? <Home /> : <Login />)
const RenderLogin = () => (logic.isUserLoggedIn() ? <navigate to='/' /> : <Login />)
const RenderRegister = () => (logic.isUserLoggedIn() ? <navigate to='/' /> : <Register />)
