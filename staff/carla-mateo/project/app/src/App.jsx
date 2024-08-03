import { Routes, Route } from 'react-router-dom'

import Register from './views/Register'
import Home from './views/Home'
import Login from './views/Login'


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App