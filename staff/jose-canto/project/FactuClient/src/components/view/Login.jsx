import { Link } from "react-router-dom"

import "./Login.css"

import Title from "../Title"
import Button from "../core/Button"
import Field from "../core/Field"

export default function Login() {
  return (
    <>
      <div className="LoginForm">
        <Title>Login</Title>

        <Field id="username" type="text" placeholder="username">
          Username
        </Field>

        <Field id="password" type="password" placeholder="password">
          Password
        </Field>

        <Button type="submit">Login</Button>
      </div>

      <Link className="Link" to="/register">
        Register
      </Link>
    </>
  )
}
