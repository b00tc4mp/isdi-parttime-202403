import { useState } from 'react'
// components
import { FormWithFeedback, Field, Button } from "../../components/core"
// logic
import loginUser from "../../logic/users/loginUser"
// validation
import validate from 'com/validate/validateUsers'

const Login = ({ setIsAuthenticated }) => {
  const [message, setMessage] = useState('')
  const [level, setLevel] = useState('error') // por defecto los message del formfeedback son rojos

  const handleLoginSubmit = async (event) => {
    event.preventDefault()

    const form = event.target
    const username = form.username.value.trim()
    const password = form.password.value.trim()

    try{
      validate.username(username)
      validate.password(password)
      
      await loginUser(username, password) // llamada a la API para iniciar sesión
      setMessage(`👋 Bienvenido ${username}!🎉`)
      setLevel('success')

      setTimeout(() => {
        setIsAuthenticated(true) // actualiza el estado de autenticación 
      }, 2000)
    } catch (error) {
      setMessage(error.message) // mostrar mensaje de error en el FormWithFeedback
    }
  }

  return (
    <div className="container">
      <FormWithFeedback onSubmit={handleLoginSubmit} message={message} level={level}>
        <Field id="username" placeholder="👷 username">Nombre de Usuario</Field>
        <Field id="password" type="password" placeholder="🗝️ password">Contraseña</Field>
        <Button className="SubmitButton">Login</Button>
      </FormWithFeedback>
    </div>
  )
}

export default Login