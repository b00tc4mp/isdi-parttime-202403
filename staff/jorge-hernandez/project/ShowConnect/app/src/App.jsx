import { useState } from 'react'
import './App.css'
import Register from './views/Register'
import Search from './views/Search'
import Login from './views/Login'
import ArtistHome from './views/ArtistHome'

import logic from './logic'
import ArtistsList from './components/ArtistsList'

function App() {
  const [view, setView] = useState(
    logic.isUserLoggedIn() ? 'ArtistHome' : 'Search'
  )

  const handleGoToRegister = () => setView('Register')
  const handleGoToLogin = () => setView('Login')
  const handleGoToArtistHome = () => setView('ArtistHome')
  const handleGoToSearch = () => setView('Search')

  return (
    <>
      {view === 'Search' && (
        <Search
          onRegisterClick={handleGoToRegister}
          onLoginClick={handleGoToLogin}
        />
      )}

      {view === 'Register' && <Register onLoginClick={handleGoToLogin} />}

      {view === 'Login' && (
        <Login
          onUserLoggedIn={handleGoToArtistHome}
          onRegisterClick={handleGoToRegister}
        />
      )}

      {view === 'ArtistHome' && (
        <ArtistHome onUserLoggedOut={handleGoToSearch} />
      )}

      {view === 'ArtistList' && <ArtistsList />}
    </>
  )
}

export default App
