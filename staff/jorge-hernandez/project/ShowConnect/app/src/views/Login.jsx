import { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import logic from '../logic'
import { SystemError } from 'com/errors'

function Login({ onLogoClick, onUserLoggedIn, onRegisterClick }) {
  const [message, setMessage] = useState('')

  const handleRegisterClick = (e) => {
    e.preventDefault()
    onRegisterClick()
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const email = form.email.value
    const password = form.password.value

    try {
      logic
        .loginUser(email, password)
        .then(() => onUserLoggedIn())
        .catch((error) => {
          console.log(error)

          if (error instanceof SystemError) {
            alert(error.message)

            return
          }

          setMessage(error.message)
        })
    } catch (error) {
      console.log(error)

      setMessage(error.message)
    }
  }

  return (
    <>
      <Header
        isArtistHomeVisible={false}
        onClick={handleRegisterClick}
        loginButtonChildren={'Registro'}
        onLogoClick={onLogoClick}
      >
        Login
      </Header>

      <form onSubmit={handleLoginSubmit}>
        <div className='Field flex flex-col gap-1 mx-2'>
          <label className='text-white' htmlFor='email'>
            Email
          </label>
          <input
            className='h-8 rounded p-2'
            type='email'
            id='email'
            name='email'
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
            name='password'
            placeholder='contraseña'
          />
        </div>

        {message && <p className='text-red-600 text-lg m-auto'>{message}</p>}
        <Footer>Iniciar Sesión</Footer>
      </form>
    </>
  )
}

export default Login
