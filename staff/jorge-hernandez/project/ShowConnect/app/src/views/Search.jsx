import Header from '../components/Header'
import Form from '../components/Form'
import logic from '../logic/index'

function Search({ onRegisterClick, onLoginClick, OnClickMessages }) {
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
      {logic.isUserLoggedIn() && (
        <i
          className='fa-regular fa-message text-2xl text-white cursor-pointer mr-8'
          onClick={OnClickMessages}
        ></i>
      )}
      <Form onClickGoToLogin={handleLoginClick} />
    </>
  )
}

export default Search
