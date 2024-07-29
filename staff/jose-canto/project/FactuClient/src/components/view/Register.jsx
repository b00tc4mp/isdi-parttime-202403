import { Link, useNavigate } from "react-router-dom"

import logic from "../../logic/index"

import "./Register.css"

import Title from "../Title"
import Field from "../core/Field"
import Button from "../core/Button"

export default function Register() {
  const navigate = useNavigate()

  const handleRegisterSubmit = (event) => {
    event.preventDefault()

    const target = event.target
    const username = target.username.value
    const email = target.email.value
    const password = target.password.value
    const confirmPassword = target.confirmPassword.value

    try {
      // prettier-ignore
      logic.registerUser( username, email, password, confirmPassword)
        .then(() => {
          navigate("/login")
        })
        .catch((error) => {
          alert(error.message)
        })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <form className="RegisterForm" onSubmit={handleRegisterSubmit}>
        <Title>Register</Title>

        <Field id="username" type="text" placeholder="username">
          Username
        </Field>

        <Field id="email" type="email" placeholder="email">
          Email
        </Field>

        <Field id="password" type="password" placeholder="password">
          Password
        </Field>

        <Field id="confirmPassword" type="password" placeholder="confirm password">
          Confirm Password
        </Field>

        <Button type="submit">Register</Button>
      </form>

      <Link className="Link" to="/login">
        Login
      </Link>
    </>
  )
}
