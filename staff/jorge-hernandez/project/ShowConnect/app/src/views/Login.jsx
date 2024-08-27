import { useState, useContext } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import logic from '../logic'
import { SystemError } from 'com/errors'
import Field from '../components/core/Field'

import Context from '../Context'

function Login({ onLogoClick, onUserLoggedIn, onRegisterClick }) {
  const [message, setMessage] = useState('')

  const { alert } = useContext(Context)

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
        .then(() => {
          const role = sessionStorage.role
          onUserLoggedIn(role)
        })
        .catch((error) => {
          console.error(error)

          if (error instanceof SystemError) {
            alert(error.message)

            return
          }

          setMessage(error.message)
        })
    } catch (error) {
      console.error(error)

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
          labelChildren='password'
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
