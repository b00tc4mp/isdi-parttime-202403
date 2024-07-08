import { useState } from "react"

import logic from "../logic"

import Field from "../components/core/Field"
import SubmitButton from "../components/core/SubmitButton"
import Link from "../components/core/Link"
import Title from "../components/core/Title"

import FormWithFeedback from "../components/library/FormWithFeedback"
import View from "../components/library/View"

function Login({ onUserLoggedIn, onRegisterLinkClick }) {
  console.log("Login -> render")

  const [message, setMessage] = useState("")

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const username = form.username.value
    const password = form.password.value

    try {
      logic.loginUser(username, password, (error) => {
        if (error) {
          console.log(error)

          setMessage(error.message)

          return
        }

        onUserLoggedIn()
      })
    } catch (error) {
      console.log(error)

      setMessage(error.message)
    }
  }

  const handleRegisterClick = (event) => {
    event.preventDefault()

    onRegisterLinkClick()
  }

  return (
    <View tag="main">
      <Title>Login</Title>

      <FormWithFeedback onSubmit={handleLoginSubmit} message={message}>
        <Field id="username" placeholder="username">
          Username
        </Field>

        <Field id="password" type="password" placeholder="password">
          Password
        </Field>

        <SubmitButton>Login</SubmitButton>
      </FormWithFeedback>

      <Link onClick={handleRegisterClick}>Register</Link>
    </View>
  )
}

export default Login
