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

  const handleSearchClick = (e) => {
    e.preventDefault()
    console.log('searchClick')
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

      <Footer onSearchclick={handleSearchClick}> Buscar </Footer>
    </>
  )
}

export default Search
