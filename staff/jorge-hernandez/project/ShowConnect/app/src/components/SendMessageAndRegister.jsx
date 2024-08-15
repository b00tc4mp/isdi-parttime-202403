import Field from './Field'
import { useState } from 'react'
import { SystemError } from 'com/errors'
import logic from '../logic'

function SendMessageAndRegister({ artistId }) {
  const [message, setMessage] = useState('')

  const handleOnSubmit = (e) => {
    e.preventDefault()

    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const messageText = form.message.value
    const password = form.password.value
    const passwordRepeat = form.passwordRepeat.value

    logic
      .registerClient(
        name,
        email,
        messageText,
        password,
        passwordRepeat,
        artistId
      )
      .then(() => {
        setMessage('User registered successfully')
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
    <>
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
          labelChildren='Mensaje'
          htmlFor='message'
          id='message'
          type='text'
          inputClass='text-black h-8 rounded p-2'
          placeholder='Escribe tu mensaje'
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
        <button
          type='submit'
          className='h-10 mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium border-none text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-md shadow-md'
        >
          Enviar
        </button>
      </form>
      {message && <p className='text-red-500'>{message}</p>}
    </>
  )
}

export default SendMessageAndRegister
