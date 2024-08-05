import Header from '../components/Header'
import Form from '../components/Form'

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
      <Form />
    </>
  )
}

export default Search
