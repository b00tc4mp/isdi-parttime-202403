import { Link, useNavigate } from "react-router-dom"

import logic from "../../logic/index"

import "./Register.css"

import Title from "../Title"
import Field from "../core/Field"
import Button from "../core/Button"
import Main from "../core/Main"
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
          ¡¡Bienvenido!!
        </Title>
      </div>

      <Main className="RegisterMain">
        <form className="RegisterForm" onSubmit={handleRegisterSubmit}>
          <Field id="username" type="text" placeholder="Nombre de Usuario"></Field>

          <Field id="email" type="email" placeholder="Email"></Field>

          <Field id="password" type="password" placeholder="Password"></Field>

          <Field id="confirmPassword" type="password" placeholder="Confirmar password"></Field>

          <Button type="submit">Registrate</Button>

          <Link to="/login">
            <div className="Link">
              <p>
                ¿Tienes cuenta? <span className="Link-RegisterLogin">Login</span>
              </p>
            </div>
          </Link>
        </form>
      </Main>

      <Footer></Footer>
    </>
  )
}
