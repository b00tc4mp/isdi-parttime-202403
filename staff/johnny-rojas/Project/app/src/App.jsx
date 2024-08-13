import { Routes, Route } from 'react-router-dom'
import Home from './components/Views/pages/Home'
import Login from './components/Views/pages/Login'
import Register from './components/Views/pages/Register'
import CreateRoom from './components/Views/pages/CreateRoom'
import HostRooms from './components/Views/pages/HostRooms'
import ManageRoom from './components/Views/pages/ManageRoom'
import Booking from './components/Views/pages/Booking'


import './App.css'
function App() {

  return <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/rooms' element={<CreateRoom />} />
    <Route path='/users/:userId/rooms' element={<HostRooms />} />
    <Route path='/rooms/:roomId/manage' element={<ManageRoom />}/>
    <Route path='/create-booking/:roomId' element={<Booking />}/>
    {/* <Route path='/users/:userId/rooms/:roomId' element={<Booking />} /> */}
  </Routes>

}

export default App

// const RenderRegister
