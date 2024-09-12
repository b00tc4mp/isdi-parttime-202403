import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormWithFeedback from "../../components/core/FormWithFeedback"
import Field from "../../components/core/Field"
import SubmitButton from "../../components/core/SubmitButton"
// import Title from "../../components/core/Title"
import loginUser from "../../logic/loginUser"

const Login = () => {

  const navigate = useNavigate();  // Invoca el hook correctamente
  const [message, setMessage] = useState('')

  const handleLoginSubmit = async (event) => {

    event.preventDefault()

    const form = event.target
    const username = form.username.value
    const password = form.password.value

    try {
      await loginUser(username, password)
      alert(`Bienvenido ${username}!👋`)
      navigate('/')  // Navega a la ruta raíz
    } catch (error) {
      console.error(error)
      setMessage(error.message)  // Establece el mensaje de error en el estado
      alert(error.message)
    }
  }

  return (
    <div className="container">
      {/* <div className="RouteTitle"><Title>Por favor, identifíquese...</Title></div> */}
    
      <FormWithFeedback onSubmit={handleLoginSubmit} message={message}>
        <Field id="username" placeholder="username">Nombre de Usuario</Field>
        <Field id="password" type="password" placeholder="password">Contraseña</Field>
        <SubmitButton className="SubmitLogin">Login</SubmitButton>
      </FormWithFeedback>
    </div>
  )
}

export default Login
