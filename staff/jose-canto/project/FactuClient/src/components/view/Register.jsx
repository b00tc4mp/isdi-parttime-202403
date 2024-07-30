import { Link, useNavigate } from "react-router-dom"

import logic from "../../logic/index"

import "./Register.css"

import Title from "../Title"
import Field from "../core/Field"
import Button from "../core/Button"
import Footer from "../core/Footer"

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
      <div className="Header">
        <Title level={1} className="FactuClient">
          FACTUCLIENT
        </Title>
        <Title level={2} className="Welcome">
          Bienvenido
        </Title>
      </div>

      <form className="RegisterForm" onSubmit={handleRegisterSubmit}>
        <Field id="username" type="text" placeholder="username"></Field>

        <Field id="email" type="email" placeholder="email"></Field>

        <Field id="password" type="password" placeholder="password"></Field>

        <Field id="confirmPassword" type="password" placeholder="confirm password"></Field>

        <Button type="submit">Registrate</Button>

        <Link className="Link" to="/login">
          Tienes cuenta? <span className="Link-RegisterLogin">Login</span>
        </Link>
      </form>

      <div className="ContainerFooter">
        <Footer></Footer>
      </div>
    </>
  )
}
