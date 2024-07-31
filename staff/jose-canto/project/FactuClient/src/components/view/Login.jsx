import { Link, useNavigate } from "react-router-dom"

import "./Login.css"

import Title from "../Title"
import Button from "../core/Button"
import Field from "../core/Field"
import logic from "../../logic"
import Footer from "../core/Footer"

export default function Login() {
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
        .catch((error) => alert(error.message))
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

      <form className="LoginForm" onSubmit={handleLoginSubmit}>
        <Field id="username" type="text" placeholder="Username"></Field>

        <Field id="password" type="password" placeholder="Password"></Field>

        <Button type="submit">Login</Button>

        <Link to="/register">
          <div className="Link">
            <p>
              ¿No tienes cuenta? <span className="Link-RegisterLogin">Registrate</span>
            </p>
          </div>
        </Link>
      </form>

      <div className="ContainerFooter">
        <Footer></Footer>
      </div>
    </>
  )
}
