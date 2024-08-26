import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'

import Profile from './views/components/Profile/Profile'
import SocialList from './views/components/SocialList/SocialList'
import GameListUser from './views/components/SocialList/GameListUser/GameListUser'

import isUserLoggedIn from './logic/isUserLoggedIn'

import './App.css'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        setIsLoggedIn(isUserLoggedIn())
    }, [])

    const handleUserLoggedOut = () => {
        console.log('User has logged out')
        setIsLoggedIn(false)
    }

    return <>
        <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route path='/' element={isUserLoggedIn() ? <Home onUserLoggedOut={handleUserLoggedOut} /> : <Navigate to="/login" />} />
            <Route path='/profile' element={isUserLoggedIn() ? <Profile /> : <Navigate to="/login" />} />
            <Route path='/sociallist' element={isUserLoggedIn() ? <SocialList /> : <Navigate to="/login" />} />
            <Route path='/profile/:userId' element={isUserLoggedIn() ? <Profile /> : <Navigate to="/login" />} />
            <Route path='/sociallist/:userId' element={isUserLoggedIn() ? <GameListUser /> : <Navigate to="/login" />} />
        </Routes>
    </>
}

export default App