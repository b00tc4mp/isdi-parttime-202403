import Field from './core/Field'
import { useState } from 'react'
import { SystemError } from 'com/errors'
import logic from '../logic'
import extractPayloadFromJWT from '../utils/extractPayloadFromJWT'
import Button from './core/Button'

function RegisterClient({ onClickGoToLogin, artistId }) {
  const [message, setMessage] = useState('')

  const handleGoToLogin = (e) => onClickGoToLogin(e)

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
        setMessage('Usuario Registrado, ya puedes hacer login')

        form.reset()

        setTimeout(() => {
          handleGoToLogin(e)
        }, 2000)
      })
      .catch((error) => {
        console.error(error)
        if (error instanceof SystemError) {
          alert(error.message)
          return
        }
        setMessage(error.message)
      })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    const form = e.target
    const token = sessionStorage.token

    const { sub: userId } = extractPayloadFromJWT(token)
    const messageText = form.message.value.trim()

    if (!userId || !artistId || !messageText) {
      console.error('userId, artistId, or messageText is missing')
      alert('Faltan datos necesarios para enviar el mensaje.')
      return
    }

    logic
      .createNewChatAndMessage(userId, artistId, messageText)
      .then(() => {
        form.reset()
        setMessage('Mensaje enviado con éxito')
      })
      .catch((error) => {
        console.error('Error sending message:', error.message)
        alert('Error al enviar el mensaje: ' + error.message)
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
            <Button>Enviar</Button>
            <p onClick={handleGoToLogin}>
              Si ya estás registrado haz click
              <span className='cursor-pointer text-green-300'>{' aquí'}</span>
            </p>
          </div>
        </form>
      ) : (
        <form className='flex flex-col gap-5' onSubmit={handleSendMessage}>
          <Field
            divClass='Field flex flex-col gap-1 mx-2'
            labelClass='text-white'
            labelChildren='Mensaje'
            htmlFor='message'
            id='message'
            name='message'
            type='text'
            inputClass='text-black h-8 rounded p-2'
            placeholder='Escribe tu mensaje'
          />
          <Button>Enviar</Button>
        </form>
      )}
      {message && <p className='text-green-500'>{message}</p>}
    </div>
  )
}

export default RegisterClient
