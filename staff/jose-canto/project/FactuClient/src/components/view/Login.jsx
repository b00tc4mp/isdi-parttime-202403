import { Link, useNavigate } from "react-router-dom"

import useContext from "../../useContext"
import { SystemError } from "com/errors"

import logic from "../../logic"

import "./Login.css"

import Title from "../Title"
import Button from "../core/Button"
import Field from "../core/Field"
import Main from "../core/Main"
import Footer from "../core/Footer"

export default function Login() {
  const { alert } = useContext()

  const navigate = useNavigate()

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
        })
        .catch((error) => {
          if(error instanceof SystemError) {
            alert(error.message)
          }
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

      <Main className="LoginMain">
        <form className="LoginForm" onSubmit={handleLoginSubmit}>
          <Field id="username" type="text" placeholder="Username"></Field>
          <Field id="password" type="password" placeholder="Password"></Field>
          <Button type="submit">Login</Button>

          <div className="Link">
            <p>
              ¿No tienes cuenta?
              <Link to="/register">
                <span className="Link-RegisterLogin">Registrate</span>
              </Link>
            </p>
          </div>
        </form>
      </Main>

      <Footer></Footer>
    </>
  )
}
