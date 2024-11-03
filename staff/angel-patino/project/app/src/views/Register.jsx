import { useState } from "react"
import logic from "../logic/index.js"

import View from "../components/library/View"
import Title from "../components/core/Title.jsx"
import Field from "../components/core/Field"
import FormWithFeedback from "../components/library/FormWithFeedback.jsx"
import SubmitButton from "../components/core/SubmitButton.jsx"
import Link from "./components/Link"

import { SystemError } from "com/errors"

function Register({ onUserRegistered, onLoginLinkClick }) {
  const [message, setMessage] = useState(null)

  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const name = form.name.value
    const surname = form.surname.value
    const email = form.email.value
    const username = form.username.value
    const password = form.password.value
    const passwordRepeat = form.passwordRepeat.value

    try {
      logic
        .registerUser(name, surname, email, username, password, passwordRepeat)
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

  const handleLoginClick = (event) => {
    event.preventDefault()

    onLoginLinkClick()
  }
  return (
    <View tag="main" className="register-view">
      <Title className="form-title">Welcome to RecipeBox</Title>
      <p className="form-subtitle">Create an account to get started</p>

      <div className="form-container">
        <FormWithFeedback onSubmit={handleRegisterSubmit} message={message}>
          <Field id="name" placeholder="Name" className="form-field">
            Name
          </Field>
          <Field id="surname" placeholder="Surname" className="form-field">
            Surname
          </Field>
          <Field
            id="email"
            type="email"
            placeholder="Email"
            className="form-field"
          >
            Email
          </Field>
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
          <Field
            id="passwordRepeat"
            type="password"
            placeholder="Repeat Password"
            className="form-field"
          >
            Repeat Password
          </Field>

          <div className="btn-container">
            <SubmitButton className="btn-register">Register</SubmitButton>
            <p className="account-message">Already have an account?</p>
            <Link onClick={handleLoginClick} className="form-link">
              Login
            </Link>
          </div>
        </FormWithFeedback>
      </div>
    </View>
  )
}
export default Register
