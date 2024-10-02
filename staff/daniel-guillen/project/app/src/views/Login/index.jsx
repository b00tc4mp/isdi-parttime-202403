import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// components
import FormWithFeedback from "../../components/core/FormWithFeedback"
import Field from "../../components/core/Field"
import Button from "../../components/core/Button"
// logic
import loginUser from "../../logic/loginUser"

const Login = ({ setIsAuthenticated }) => {
  // const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [level, setLevel] = useState('error') // por defecto los message del formfeedback son rojos

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    const form = event.target
    const username = form.username.value.trim()
    const password = form.password.value.trim()

    // validaciones primer paso 
    if (!username || !password) {
      setMessage('Debe proporcionar nombre de usuario y contraseña.')
      return
    }

    try {
      await loginUser(username, password) // llamada a la API para iniciar sesión
      setTimeout(() => {
        setIsAuthenticated(true) // actualiza el estado de autenticación 
      }, 2000)   
      setMessage(`👋 Bienvenido ${username}!🎉`)
      setLevel('success') // 'success' aplicamos el estilo verde
    } catch (error) {
      console.error(error)
      setMessage(error.message) // mostrar mensaje de error en la UI
      alert(error.message) // mostrar alerta con el mensaje de error
    }
  }

  return (
    <div className="container">
      <FormWithFeedback onSubmit={handleLoginSubmit} message={message} level={level}>
        <Field id="username" placeholder="username">Nombre de Usuario</Field>
        <Field id="password" type="password" placeholder="password">Contraseña</Field>
        <Button className="SubmitButton">Login</Button>
      </FormWithFeedback>
    </div>
  )
}

export default Login