import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from './views/useContext'

import Register from './views/Register'
import Login from './views/Login'
import Home from './views/Home'

import Profile from './views/components/Profile/Profile'
import SocialList from './views/components/SocialList/SocialList'
import GameListUser from './views/components/SocialList/GameListUser/GameListUser'

import isUserLoggedIn from './logic/isUserLoggedIn'

import Alert from './views/components/Alert/Alert'

import './App.css'

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

                    <Route path='/' element={<RenderHome />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/sociallist' element={<SocialList />} />
                    <Route path='/profile/:userId' element={<Profile />} />
                    <Route path='/sociallist/:userId' element={<GameListUser />} />
                </Routes>

                {message && <Alert message={message} onAccept={handleAlertAccepted} />}
            </Context.Provider>
        </>
    )
}

export default App

const RenderHome = () => isUserLoggedIn() ? <Home /> : <Navigate to='/login' />
const RenderLogin = () => isUserLoggedIn() ? <Navigate to='/' /> : <Login />
const RenderRegister = () => isUserLoggedIn() ? <Navigate to='/register' /> : <Register />  