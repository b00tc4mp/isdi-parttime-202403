import Header from '../components/Header'
import Form from '../components/Form'
import logic from '../logic/index'

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
        loginButtonChildren={logic.isUserLoggedIn() ? 'Logout' : 'Login'}
        onClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        isArtistHomeVisible={false}
      >
        ¿Eres artista? Regístrate
      </Header>
      <Form onClickGoToLogin={handleLoginClick} />
    </>
  )
}

export default Search
