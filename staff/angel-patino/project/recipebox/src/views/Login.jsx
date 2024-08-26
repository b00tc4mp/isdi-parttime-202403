import { useState } from "react"
import View from "../components/library/View"
import Field from "../components/core/Field"
import Button from "../components/core/Button.jsx"
import FormWithFeedback from "../components/library/FormWithFeedback.jsx"
import SubmitButton from "../components/core/SubmitButton.jsx"
import Link from "./components/Link.jsx"

import Title from "../components/core/Title.jsx"

import logic from "../logic/index.js"
import { SystemError } from "com/errors"

function Login({ onUserLoggedIn, onRegisterLinkClick }) {
  const [message, setMessage] = useState("")

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const username = form.username.value
    const password = form.password.value

    try {
      logic
        .loginUser(username, password)
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

  const handleRegisterClick = (event) => {
    event.preventDefault()

    onRegisterLinkClick()
  }
  return (
    <View tag="main" className="login-view">
      <Title className="form-title">
        Welcome to <span className="highlight">RecipeBox</span>
      </Title>
      <p className="form-subtitle">Login to continue</p>
      <div className="form-container">
        <FormWithFeedback onSubmit={handleLoginSubmit} message={message}>
          <Field id="username" placeholder="Username" className="form-field">
            Username
          </Field>

          <Field
            id="password"
            type="password"
            placeholder="Password"
            className="form-field"
          >
            Password
          </Field>

          <div className="btn-container">
            <SubmitButton className="btn-login">Login</SubmitButton>
            <p className="account-message">Don't have an account?</p>
            <Link onClick={handleRegisterClick} className="form-link">
              Register
            </Link>
          </div>
        </FormWithFeedback>
      </div>
    </View>
  )
}

export default Login
