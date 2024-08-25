import Header from '../components/Header'
import FormSearch from '../components/FormSearch'
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
        <div className='flex justify-end p-4'>
          <i
            className='fa-regular fa-message text-2xl text-white cursor-pointer'
            onClick={OnClickMessages}
          ></i>
        </div>
      )}
      <FormSearch onClickGoToLogin={handleLoginClick} />
    </>
  )
}

export default Search
