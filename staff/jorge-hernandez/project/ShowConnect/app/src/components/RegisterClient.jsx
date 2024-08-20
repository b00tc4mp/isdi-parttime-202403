import Field from './Field'
import { useState } from 'react'
import { SystemError } from 'com/errors'
import logic from '../logic'

function RegisterClient({ onClickGoToLogin }) {
  const [message, setMessage] = useState('')

  const handleGoToLogin = () => onClickGoToLogin()

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const passwordRepeat = form.passwordRepeat.value

    logic
      .registerClient(name, email, password, passwordRepeat)
      .then(() => {
        setMessage('Usuario Registrado')
      })
      .catch((error) => {
        console.log(error)
        if (error instanceof SystemError) {
          alert(error.message)
          return
        }
        setMessage(error.message)
      })
  }

  return (
    <div>
      {!logic.isUserLoggedIn() ? (
        <form onSubmit={handleOnSubmit}>
          <Field
            divClass='Field flex flex-col gap-1 mx-2'
            labelClass='text-white'
            labelChildren='Nombre completo'
            htmlFor='name'
            id='name'
            type='text'
            inputClass='text-black h-8 rounded p-2'
            placeholder='Nombre y Apellidos'
          />
          <Field
            divClass='Field flex flex-col gap-1 mx-2'
            labelClass='text-white'
            labelChildren='E-mail'
            htmlFor='email'
            id='email'
            type='email'
            inputClass='text-black h-8 rounded p-2'
            placeholder='ejemplo@ejemplo.com'
          />
          <Field
            divClass='Field flex flex-col gap-1 mx-2'
            labelClass='text-white'
            labelChildren='Password'
            htmlFor='password'
            id='password'
            type='password'
            inputClass='text-black h-8 rounded p-2'
            placeholder='contraseña'
          />
          <Field
            divClass='Field flex flex-col gap-1 mx-2'
            labelClass='text-white'
            labelChildren='Repite la contraseña'
            htmlFor='passwordRepeat'
            id='passwordRepeat'
            type='password'
            inputClass='text-black h-8 rounded p-2'
            placeholder='repite la contraseña'
          />
          <div className='flex flex-col items-center'>
            <button
              type='submit'
              className='items-end h-10 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-md'
            >
              Enviar
            </button>
            <p onClick={handleGoToLogin} className=''>
              Si ya estás registrado haz click
              <span
                onClick={onClickGoToLogin}
                className='cursor-pointer text-green-300'
              >
                {' aquí'}
              </span>
            </p>
          </div>
        </form>
      ) : (
        <form action=''>
          <Field
            divClass='Field flex flex-col gap-1 mx-2'
            labelClass='text-white'
            labelChildren='Mensaje'
            htmlFor='message'
            id='message'
            type='text'
            inputClass='text-black h-8 rounded p-2'
            placeholder='Escribe tu mensaje'
          />
        </form>
      )}
      {message && <p className='text-green-500'>{message}</p>}
    </div>
  )
}

export default RegisterClient
