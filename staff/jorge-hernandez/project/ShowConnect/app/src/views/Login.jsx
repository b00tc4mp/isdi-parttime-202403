import { useState, useContext } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import logic from '../logic'
import { SystemError, CredentialsError } from 'com/errors'
import Field from '../components/core/Field'
import Context from '../Context'

function Login({ onLogoClick, onUserLoggedIn, onRegisterClick }) {
  const [message, setMessage] = useState('')

  const { alert } = useContext(Context)

  const handleRegisterClick = (e) => {
    e.preventDefault()
    onRegisterClick()
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    const form = event.target

    const email = form.email.value
    const password = form.password.value

    try {
      await logic.loginUser(email, password)

      const role = sessionStorage.getItem('role')

      onUserLoggedIn(role)
    } catch (error) {
      console.error(error)

      if (error instanceof CredentialsError) {
        // Manejo específico para CredentialsError
        setMessage(error.message)
      } else if (error instanceof SystemError) {
        // Manejo específico para SystemError
        alert(error.message)
      } else {
        // Manejo genérico para otros errores
        setMessage('An unexpected error occurred. Please try again.')
      }
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
        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelClass='text-white'
          labelChildren='Email'
          htmlFor='email'
          id='email'
          type='email'
          inputClass='h-8 rounded p-2'
          placeholder='ejemplo@ejemplo.com'
        />

        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelClass='text-white'
          labelChildren='Password'
          htmlFor='password'
          id='password'
          type='password'
          inputClass='h-8 rounded p-2'
          placeholder='password'
        />

        {message && (
          <p className='text-red-600 text-lg text-center mt-2'>{message}</p>
        )}
        <Footer>Iniciar Sesión</Footer>
      </form>
    </>
  )
}

export default Login
