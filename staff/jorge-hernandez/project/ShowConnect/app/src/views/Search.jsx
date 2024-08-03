import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

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
        ¿Eres artista? Regístrate{' '}
      </Header>
      <Main handleSearchClick />
      <Footer> Buscar </Footer>{' '}
    </>
  )
}

export default Search
