import { useContext, useState } from "react"

import logic from "../../logic"

import View from "../library/View"
import Title from "../Title"
import FormWithFeedback from "../library/FormWithFeedback"
import Field from "../core/Field"
import CheckPasswordField from "../core/ShowPasswordField"
import Link from "../core/Link"
import SubmitButton from "../core/SubmitButton"

import ViewContext from "../../ViewContext"

function Register() {
  console.log("Register --> render")

  const { setView } = useContext(ViewContext)
  const [message, setMessage] = useState("")

  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    const target = event.target

    const name = target.name.value
    const surname = target.surname.value
    const email = target.email.value
    const username = target.username.value
    const password = target.password.value
    const passwordRepeat = target.passwordRepeat.value

    try {
      // prettier-ignore
      logic.registerUser(name, surname, email, username, password, passwordRepeat)
        .then(() => {
          setView("login")

          console.log("user registered")
        })
        .catch((error) => {
          console.log(error)

          setMessage(error.message)
          setTimeout(() => setMessage(""), 2000)
          return
        })
    } catch (error) {
      setMessage(error.message)
      setTimeout(() => setMessage(""), 2000)
      console.error(error.message)
    }
  }

  const handleLoginClick = (event) => {
    event.preventDefault()

    setView("login")
  }
  return (
    <>
      <View className="View RegisterForm" tag="main">
        <Title>REGISTER</Title>
        <FormWithFeedback className="RegisterForm" onSubmit={handleRegisterSubmit} message={message}>
          <Field id="name" placeholder="name">
            Name
          </Field>

          <Field id="surname" placeholder="surname">
            Surname
          </Field>

          <Field id="email" placeholder="email">
            Email
          </Field>

          <Field id="username" placeholder="username">
            Username
          </Field>

          <CheckPasswordField className="PasswordForm" id="password" placeholder="Password">
            Password
          </CheckPasswordField>

          <CheckPasswordField className="PasswordRepeatForm" id="passwordRepeat" placeholder="Password Repeat">
            Password Repeat
          </CheckPasswordField>

          <SubmitButton type="submit">Register</SubmitButton>
        </FormWithFeedback>
        <Link onClick={handleLoginClick}>Have already an account? Login</Link>
      </View>
    </>
  )
}

export default Register
