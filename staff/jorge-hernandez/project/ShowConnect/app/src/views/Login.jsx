import Footer from '../components/Footer'
import Header from '../components/Header'

import logic from '../logic'

function Login({ onUserLoggedIn, onRegisterClick }) {
  const handleRegisterClick = (e) => {
    e.preventDefault()
    onRegisterClick()
  }
  const handleLoginSubmit = (e) => {
    e.preventDefault()

    const form = e.target

    const email = form.email.value
    const password = form.password.value

    console.log(email, password)

    try {
      logic
        .loginUser(email, password)
        .then(() => onUserLoggedIn())
        .catch((error) => console.error(error.message))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Header
        isArtistHomeVisible={false}
        onClick={handleRegisterClick}
        loginButtonChildren={'Registro'}
      >
        Login
      </Header>

      <form onSubmit={handleLoginSubmit} action=''>
        <div className='Field flex flex-col gap-1 mx-2'>
          <label className='text-white' htmlFor='email'>
            Email
          </label>
          <input
            className='h-8 rounded p-2'
            type='email'
            id='email'
            placeholder='ejemplo@ejemplo.com'
          />
        </div>

        <div className='Field flex flex-col gap-1 mx-2'>
          <label className='text-white' htmlFor='password'>
            Contraseña
          </label>
          <input
            className='h-8 rounded p-2'
            type='password'
            id='password'
            placeholder='contraseña'
          />
        </div>
        <Footer>Iniciar Sesión</Footer>
      </form>
    </>
  )
}
export default Login
