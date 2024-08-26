import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Context } from '../src/components/Views/core/UseContext'
import Home from './components/Views/pages/Home'
import Login from './components/Views/pages/Login'
import Register from './components/Views/pages/Register'
import CreateRoom from './components/Views/pages/CreateRoom'
import HostRooms from './components/Views/pages/HostRooms'
import ManageRoom from './components/Views/pages/ManageRoom'
import Booking from './components/Views/pages/Booking'
import GuestBookings from './components/Views/pages/GuestBookings'
import ManageProfile from './components/Views/pages/ManageProfile'
import Alert from './components/Views/core/Alert'


import './App.css'
function App() {
  const [message, setMessage] = useState(null)

  const handleMessage = (message) => setMessage(message)
  const handleAlertAccepted = () => setMessage(null)

  return (
    <>
      <Context.Provider value={{ alert: handleMessage }}>
        
        < Routes >
          
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/rooms' element={<CreateRoom />} />
          <Route path='/users/:userId/rooms' element={<HostRooms />} />
          <Route path='/rooms/:roomId/manage' element={<ManageRoom />} />
          <Route path='/create-booking/:roomId' element={<Booking />} />
          <Route path='/users/:userId/bookings' element={<GuestBookings />} />
          <Route path='/users/:userId/manage' element={<ManageProfile />} />

        </Routes >

        {message && <Alert message={message} onAccept={handleAlertAccepted} />}

      </Context.Provider>
    </>
  )

}

export default App



