import logic from '../logic'
import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'
import FormWithFeedback from '../components/library/FormWithFeedback'
import Link from '../components/core/Link'
import Title from '../components/core/Title'
import View from '../components/library/View'

import { useState } from 'react'

function Login({ onUserLoggedIn, onRegisterLinkClick }) {
  const [message, setMessage] = useState('')

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const username = form.username.value
    const password = form.password.value

    try {
      logic
        .loginUser(username, password)
        .then(() => {
          onUserLoggedIn()
        })
        .catch((error) => {
          setMessage(error.message)
        })
    } catch (error) {
      console.error(error)

      setMessage(error.message)
    }
  }
  const handleRegisterClick = (event) => {
    event.preventDefault()

    onRegisterLinkClick()
  }

  return (
    <View className='View center' tag='main'>
      <FormWithFeedback onSubmit={handleLoginSubmit} message={message}>
        <Title>Login</Title>
        <Field id='username' placeholder='username'>
          Username
        </Field>

        <Field id='password' type='password' placeholder='password'>
          Password
        </Field>

        <SubmitButton>Login</SubmitButton>

        <Link onClick={handleRegisterClick}>Register</Link>
      </FormWithFeedback>
    </View>
  )
}

export default Login
