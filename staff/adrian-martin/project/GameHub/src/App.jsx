import { Routes, Route } from 'react-router-dom'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'

import Profile from './views/components/Profile/Profile'

import './App.css'

function App() {

    const handleUserLoggedOut = () => {
        console.log('User has logged out')
    }

    return <>
        <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home onUserLoggedOut={handleUserLoggedOut} />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    </>
}

export default App