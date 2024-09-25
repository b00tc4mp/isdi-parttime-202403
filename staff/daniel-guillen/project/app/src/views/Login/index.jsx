import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// components
import FormWithFeedback from "../../components/core/FormWithFeedback"
import Field from "../../components/core/Field"
import Button from "../../components/core/Button"
// logic
import loginUser from "../../logic/loginUser"

const Login = () => {

  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const handleLoginSubmit = async (event) => {

    event.preventDefault()

    const form = event.target
    const username = form.username.value
    const password = form.password.value

    try {
      await loginUser(username, password)
      alert(`Bienvenido ${username}!👋`)
      navigate('/')  // redirecciona a pagina home
    } catch (error) {
      console.error(error)
      setMessage(error.message)
      alert(error.message)
    }
  }

  return (
    <div className="container">
      <FormWithFeedback onSubmit={handleLoginSubmit} message={message}>
        <Field id="username" placeholder="username">Nombre de Usuario</Field>
        <Field id="password" type="password" placeholder="password">Contraseña</Field>
        <Button className="SubmitLogin">Login</Button>
      </FormWithFeedback>
    </div>
  )
}

export default Login
