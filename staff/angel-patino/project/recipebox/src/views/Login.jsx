import { useState } from "react"
import View from "../components/library/View"
import Field from "../components/core/Field"
import Input from "../components/core/Input"
import Button from "../components/core/Button"
import Form from "../components/core/Form"

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
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <p className="login-welcome">Welcome to RecipesBox</p>

        <Form onSubmit={handleLoginSubmit}>
          <Field className="login-field">
            <Label htmlFor="username" className="login-label">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              className="login-input"
              placeholder="Enter your username"
              required
            />
          </Field>
          <Field className="login-field">
            <Label htmlFor="password" className="login-label">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="login-input"
              placeholder="Enter your password"
              required
            />
          </Field>
          {message && <p className="login-error">{message}</p>}
          <View className="login-submit-container">
            <Button type="submit" className="login-submit-button">
              LOGIN
            </Button>
          </View>
        </Form>

        <View className="login-alternative">
          <div className="login-divider-container">
            <hr className="login-divider" />
            <span className="login-divider-text">Or Login with</span>
          </div>
          <Button className="login-google-button">
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

        <View className="login-register">
          <p className="login-register-text">Don't have an account?</p>
          <Button onClick={handleRegisterClick} className="login-register-link">
            Register Now
          </Button>
        </View>
      </div>
    </View>
  )
}

export default Login
