import ArtistsList from '../components/ArtistsList'
import Header from '../components/Header'
import Main from '../components/Main'

function Search({ onRegisterClick, onLoginClick }) {
  const handleRegisterClick = (e) => {
    e.preventDefault()

    onRegisterClick()
  }
  const handleLoginClick = (e) => {
    e.preventDefault()

    onLoginClick()
  }

  return (
    <>
      <Header
        loginButtonChildren={'Login'}
        onClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        isArtistHomeVisible={false}
      >
        ¿Eres artista? Regístrate
      </Header>
      <Main />
    </>
  )
}

export default Search
