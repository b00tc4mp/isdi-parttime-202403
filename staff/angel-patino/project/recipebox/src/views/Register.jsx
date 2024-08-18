import { useState } from "react"
import logic from "../logic/index.js"
import View from "../components/library/View"
import Field from "../components/core/Field"
import Input from "../components/core/Input"
import Label from "../components/core/Label"
import Button from "../components/core/Button"
import Form from "../components/core/Form"
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
      <div className="register-container">
        <h1 className="register-title">Register</h1>
        <p className="register-welcome">Hello! Register to get started</p>
        <Form onSubmit={handleRegisterSubmit}>
          <Field className="register-field">
            <Label htmlFor="name" className="register-label">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              className="register-input"
              placeholder="Enter your name"
              required
            />
          </Field>
          <Field className="register-field">
            <Label htmlFor="surname" className="register-label">
              Surname
            </Label>
            <Input
              id="surname"
              name="surname"
              className="register-input"
              placeholder="Enter your surname"
              required
            />
          </Field>
          <Field className="register-field">
            <Label htmlFor="email" className="register-label">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              className="register-input"
              placeholder="Enter your email"
              required
            />
          </Field>
          <Field className="register-field">
            <Label htmlFor="username" className="register-label">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              className="register-input"
              placeholder="Enter your username"
              required
            />
          </Field>
          <Field className="register-field">
            <Label htmlFor="password" className="register-label">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="register-input"
              placeholder="Enter your password"
              required
            />
          </Field>
          <Field className="register-field">
            <Label htmlFor="passwordRepeat" className="register-label">
              Password Repeat
            </Label>
            <Input
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              className="register-input"
              placeholder="Repeat your password"
              required
            />
          </Field>
          {message && <p className="register-error">{message}</p>}
          <View className="register-submit-container">
            <Button type="submit" className="register-submit-button">
              Create an account
            </Button>
          </View>
        </Form>

        <View className="register-alternative">
          <div className="register-divider-container">
            <hr className="register-divider" />
            <span className="register-divider-text">Or Register with</span>
          </div>
          <Button className="register-google-button">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              {/* SVG paths for Google logo */}
            </svg>
            Sign in with Google
          </Button>
        </View>

        <View className="register-login">
          <p className="register-login-text">Already have an account?</p>
          <Link onClick={handleLoginClick} className="register-login-link">
            Login Now
          </Link>
        </View>
      </div>
    </View>
  )
}
export default Register
