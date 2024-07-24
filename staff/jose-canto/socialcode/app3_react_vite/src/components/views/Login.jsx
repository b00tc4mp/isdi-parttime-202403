import { useState } from "react"
import { useNavigate } from "react-router-dom"

import logic from "../../logic"

import View from "../library/View"
import Title from "../Title"
import FormWithFeedback from "../library/FormWithFeedback"
import Field from "../core/Field"
import CheckPasswordField from "../core/ShowPasswordField"
import Link from "../core/Link"
import SubmitButton from "../core/SubmitButton"

function Login() {
  console.log("Login --> render")

  const navigate = useNavigate()

  const [message, setMessage] = useState("")

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    const target = event.target

    const username = target.username.value
    const password = target.password.value

    try {
      // prettier-ignore
      logic.loginUser(username, password)
        .then(() => {
          navigate("/")
          console.log("user logged in")
        })
        .catch((error) => {
          console.log(error)
          setMessage(error.message)
          setTimeout(() => setMessage(""), 2000)
        })
    } catch (error) {
      setMessage(error.message)
      setTimeout(() => setMessage(""), 2000)
      console.error(error.message)
    }
  }

  const handleRegisterClick = (event) => {
    event.preventDefault()

    navigate("/register")
  }
  return (
    <>
      <View className="View LoginForm" tag="main">
        <Title>LOGIN</Title>
        <FormWithFeedback className="LoginForm" onSubmit={handleLoginSubmit} message={message}>
          <Field id="username" placeholder="Username">
            Username
          </Field>
          <CheckPasswordField className="PasswordForm" id="password" placeholder="Password">
            Password
          </CheckPasswordField>
          <SubmitButton type="submit">Login</SubmitButton>
        </FormWithFeedback>
        <Link onClick={handleRegisterClick}> Don´t have an account? Register </Link>
      </View>
    </>
  )
}

export default Login
