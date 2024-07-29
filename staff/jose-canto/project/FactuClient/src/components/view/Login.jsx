import { Link, useNavigate } from "react-router-dom"

import "./Login.css"

import Title from "../Title"
import Button from "../core/Button"
import Field from "../core/Field"
import logic from "../../../../api/logic"

export default function Login() {
  const navigate = useNavigate()
  const handleLoginSubmit = (event) => {
    event.preventDefault()

    const target = event.target
    const username = target.username.value
    const password = target.password.value

    try {
      // prettier-ignore
      logic.authenticateUser(username, password)
        .then(() => {
          navigate("/")
        })
        .catch((error) => alert(error.message))
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <>
      <form className="LoginForm" onSubmit={handleLoginSubmit}>
        <Title>Login</Title>

        <Field id="username" type="text" placeholder="username">
          Username
        </Field>

        <Field id="password" type="password" placeholder="password">
          Password
        </Field>

        <Button type="submit">Login</Button>
      </form>

      <Link className="Link" to="/register">
        Register
      </Link>
    </>
  )
}
