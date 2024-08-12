import { useState } from 'react'
import './App.css'
import Register from './views/Register'
import Search from './views/Search'
import Login from './views/Login'
import ArtistHome from './views/ArtistHome'
import ArtistMessages from './views/ArtistMessages'

import logic from './logic'

function App() {
  const [view, setView] = useState(
    logic.isUserLoggedIn() ? 'artistHome' : 'search'
  )

  const handleGoToRegister = () => setView('register')
  const handleGoToLogin = () => setView('login')
  const handleGoToArtistHome = () => setView('artistHome')
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
          onUserLoggedIn={handleGoToArtistHome}
          onRegisterClick={handleGoToRegister}
        />
      )}

      {view === 'artistHome' && (
        <ArtistHome
          onShowMessage={handleGoToMessages}
          onUserLoggedOut={handleGoToSearch}
        />
      )}
      {view === 'messages' && (
        <ArtistMessages onClickedBack={handleGoToArtistHome} />
      )}
    </>
  )
}

export default App
