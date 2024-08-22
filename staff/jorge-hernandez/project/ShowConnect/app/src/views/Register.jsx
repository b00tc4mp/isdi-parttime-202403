import Field from '../components/core/Field'
import Footer from '../components/Footer'
import Header from '../components/Header'
import logic from '../logic/index'

import { SystemError } from 'com/errors'

import { useState } from 'react'

function Register({ onLoginClick, onLogoClick, onUserRegistered }) {
  const [message, setMessage] = useState('')

  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const name = form.name.value
    const artisticName = form.artisticName.value
    const discipline = form.discipline.value.toLowerCase()
    const description = form.description.value
    const email = form.email.value
    const city = form.city.value.toLowerCase()
    const image = form.image.value
    const video = form.video.value
    const password = form.password.value
    const passwordRepeat = form.passwordRepeat.value

    try {
      logic
        .registerArtist(
          name,
          artisticName,
          discipline,
          city,
          description,
          email,
          image,
          video,
          password,
          passwordRepeat
        )
        .then(() => onUserRegistered())
        .catch((error) => {
          console.log(error)

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

  const handleLoginClick = (e) => {
    e.preventDefault()
    onLoginClick()
  }

  return (
    <>
      <Header
        isArtistHomeVisible={false}
        onClick={handleLoginClick}
        loginButtonChildren={'Login'}
        onLogoClick={onLogoClick}
      >
        Registro
      </Header>

      <form
        onSubmit={handleRegisterSubmit}
        className='flex flex-col gap-5'
        action=''
      >
        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelClass='text-white'
          labelChildren='Nombre completo'
          htmlFor='name'
          id='name'
          type='text'
          inputClass='h-8 rounded p-2'
          placeholder='Nombre y Apellidos'
        />

        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelChildren='Nombre artístico'
          labelClass='text-white'
          htmlFor='artisticName'
          inputClass='h-8 rounded p-2'
          type='text'
          id='artisticName'
          placeholder='Nombre artístico, nombre del grupo...'
        />

        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelClass='text-white'
          htmlFor='email'
          labelChildren='E-mail'
          inputClass='h-8 rounded p-2'
          type='email'
          id='email'
          placeholder='ejemplo@ejemplo.com'
        />

        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelClass='text-white'
          htmlFor='discipline'
          labelChildren='Disciplina'
          inputClass='h-8 rounded p-2'
          type='text'
          id='discipline'
          placeholder='mago, músico...'
        />

        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelClass='text-white'
          htmlFor='city'
          labelChildren='Ciudad'
          inputClass='h-8 rounded p-2'
          type='text'
          id='city'
          placeholder='Madrid, Barcelona'
        />

        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelClass='text-white'
          htmlFor='description'
          labelChildren='Describe tu espectáculo'
          inputClass='h-8 rounded p-2'
          type='text'
          id='description'
          placeholder='describe tu espectáculo'
        />

        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelClass='text-white'
          htmlFor='image'
          labelChildren='Imágen'
          inputClass='h-8 rounded p-2'
          type='text'
          id='image'
          placeholder='Link de foto'
        />

        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelClass='text-white'
          htmlFor='video'
          labelChildren='Video'
          inputClass='h-8 rounded p-2'
          type='text'
          id='video'
          placeholder='link de youtube'
        />

        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelClass='text-white'
          htmlFor='password'
          labelChildren='Contraseña'
          inputClass='h-8 rounded p-2'
          type='password'
          id='password'
          placeholder='Escribe una contraseña'
        />

        <Field
          divClass='Field flex flex-col gap-1 mx-2'
          labelClass='text-white'
          htmlFor='passwordRepeat'
          labelChildren='Repite la Contraseña'
          inputClass='h-8 rounded p-2'
          type='password'
          id='passwordRepeat'
          placeholder='Repite la contraseña'
        />

        <p className='text-red-600 text-lg m-auto'>{message}</p>

        <Footer>Registrar</Footer>
      </form>
    </>
  )
}

export default Register
