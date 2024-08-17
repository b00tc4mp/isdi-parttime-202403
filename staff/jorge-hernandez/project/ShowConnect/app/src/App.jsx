import { useState, useEffect } from 'react'
import './App.css'
import Register from './views/Register'
import Search from './views/Search'
import Login from './views/Login'
import ArtistHome from './views/ArtistHome'
import ClientHome from './views/ClientHome'
import ArtistMessages from './views/ArtistMessages'
import logic from './logic'

function App() {
  const [view, setView] = useState('search')
  const [role, setRole] = useState(sessionStorage.getItem('role') || '')

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      const storedRole = sessionStorage.getItem('role')
      if (storedRole) {
        setRole(storedRole)
        setView(storedRole === 'client' ? 'clientHome' : 'artistHome')
      }
    }
  }, [])

  const handleGoToRegister = () => setView('register')
  const handleGoToLogin = () => setView('login')

  const handleGotoHome = (role) => {
    sessionStorage.setItem('role', role)
    setRole(role)
    setView(role === 'artist' ? 'artistHome' : 'clientHome')
  }

  const handleGoToSearch = () => setView('search')
  const handleGoToMessages = () => setView('messages')

  return (
    <>
      {view === 'search' && (
        <Search
          onRegisterClick={handleGoToRegister}
          onLoginClick={handleGoToLogin}
        />
      )}

      {view === 'register' && (
        <Register
          onLogoClick={handleGoToSearch}
          onLoginClick={handleGoToLogin}
          onUserRegistered={handleGoToLogin}
        />
      )}

      {view === 'login' && (
        <Login
          onLogoClick={handleGoToSearch}
          onUserLoggedIn={handleGotoHome}
          onRegisterClick={handleGoToRegister}
        />
      )}

      {view === 'artistHome' && role === 'artist' && (
        <ArtistHome
          onShowMessage={handleGoToMessages}
          onUserLoggedOut={handleGoToSearch}
        />
      )}

      {view === 'clientHome' && role === 'client' && (
        <ClientHome onUserLoggedOut={handleGoToSearch} />
      )}

      {view === 'messages' && (
        <ArtistMessages onClickedBack={handleGoToSearch} />
      )}
    </>
  )
}

export default App
