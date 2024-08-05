import Home from './components/Views/pages/Home'
import Login from './components/Views/pages/Login'
import Register from './components/Views/pages/Register'
import CreateRoom from './components/Views/pages/CreateRoom'
import { Routes, Route } from 'react-router-dom'

import './App.css'

function App() {

  return <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/rooms' element={<CreateRoom />} />
  </Routes>

}

export default App
