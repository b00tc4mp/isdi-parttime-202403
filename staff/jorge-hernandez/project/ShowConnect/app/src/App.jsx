import { useState, useEffect } from 'react'
import './App.css'
import Alert from './components/Alert'
import Register from './views/Register'
import Search from './views/Search'
import Login from './views/Login'
import ArtistHome from './views/ArtistHome'
import ClientHome from './views/ClientHome'
import logic from './logic'
import Context from './Context'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

function App() {
  const [role, setRole] = useState(sessionStorage.role || '')
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      const storedRole = sessionStorage.role
      if (storedRole) {
        setRole(storedRole)
      }
    }
  }, [navigate])

  const handleGoToRegister = () => navigate('/register')
  const handleGoToLogin = () => navigate('/login')

  const handleGotoHome = (role) => {
    sessionStorage.role = role
    setRole(role)
    navigate(role === 'artist' ? '/artist-home' : '/client-home')
  }

  const handleGoToSearch = () => navigate('/')

  const handleAlertAccepted = () => setMessage(null)

  const handleMessage = (message) => setMessage(message)

  return (
    <Context.Provider value={{ alert: handleMessage }}>
      <Routes>
        <Route
          path='/'
          element={
            <Search
              OnClickMessages={() => navigate('/client-home')}
              onRegisterClick={handleGoToRegister}
              onLoginClick={() => {
                if (logic.isUserLoggedIn()) {
                  logic.logoutUser()
                  sessionStorage.removeItem('role')
                  setRole('')
                  navigate('/')
                } else {
                  navigate('/login')
                }
              }}
            />
          }
        />

        <Route
          path='/register'
          element={
            logic.isUserLoggedIn() ? (
              <Navigate
                to={role === 'client' ? '/client-home' : '/artist-home'}
              />
            ) : (
              <Register
                onLogoClick={handleGoToSearch}
                onLoginClick={handleGoToLogin}
                onUserRegistered={handleGoToLogin}
              />
            )
          }
        />

        <Route
          path='/login'
          element={
            logic.isUserLoggedIn() ? (
              <Navigate
                to={role === 'client' ? '/client-home' : '/artist-home'}
              />
            ) : (
              <Login
                onLogoClick={handleGoToSearch}
                onUserLoggedIn={handleGotoHome}
                onRegisterClick={handleGoToRegister}
              />
            )
          }
        />

        <Route
          path='/artist-home'
          element={
            role === 'artist' ? (
              <ArtistHome
                onShowMessage={() => navigate('/messages')}
                onUserLoggedOut={handleGoToSearch}
              />
            ) : (
              <Navigate to='/login' />
            )
          }
        />

        <Route
          path='/client-home'
          element={
            role === 'client' ? (
              <ClientHome
                onLogoClick={handleGoToSearch}
                onUserLoggedOut={handleGoToSearch}
              />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
      </Routes>
      {message && <Alert message={message} onAccept={handleAlertAccepted} />}
    </Context.Provider>
  )
}

export default App
