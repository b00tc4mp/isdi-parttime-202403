import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// components
import Field from '../../../components/core/Field'
import Button from '../../../components/core/Button'
import Title from '../../../components/core/Title'
import FormWithFeedback from '../../../components/core/FormWithFeedback'
import AccessControl from '../../../components/users/AccessControl'

const RegisterUser = () => {
    const [message, setMessage] = useState('')
    const [valueAccess, setValueAccess] = useState('')
    
    const navigate = useNavigate()
    const [token] = useState(sessionStorage.getItem('token'))[0] // obtener el token de sessionStorage

    const handleAccessChange = (newAccessLevel) => {
        setValueAccess(newAccessLevel)
    }

    // Lógica para crear un nuevo usuario
    const createNewUser = async (username, password, passwordRepeat, access) => {
        // Validación en el frontend antes de enviar al servidor
        if (typeof username !== 'string' || username.length < 3) {
            throw new Error('Nombre de usuario no válido o demasiado corto. Debe tener al menos 3 caracteres')
        }

        if (!['admin', 'almacen', 'vehiculos'].includes(access)) {
            throw new Error('El campo "access" debe ser "admin", "almacen", o "vehiculos".')
        }

        if (password !== passwordRepeat) {
            throw new Error('Las contraseñas no coinciden')
        }

        if (password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres')
        }

        try {
            // Enviar la solicitud
            const response = await fetch(`${import.meta.env.VITE_API_URL}users/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username,
                    access,
                    password,
                }),
            })

            // Inspeccionar la respuesta antes de convertirla a JSON
            const text = await response.text()
            console.log('Raw Response:', text)

            const result = JSON.parse(text) // Convertir el texto a JSON

            // Manejar la respuesta del servidor
            if (!response.ok) {
                throw new Error(result.message || 'Error al registrar usuario')
            }

            return result // Retorna la respuesta si el registro fue exitoso
        } catch (error) {
            console.error('Error al registrar usuario:', error.message)
            throw new Error('Error al registrar usuario: ' + error.message)
        }
    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            await createNewUser(username, password, passwordRepeat, valueAccess)
            alert('Registro completado! 🎉')
            navigate('/Admin/users')
        } catch (error) {
            console.error(error)
            alert(error.message) // Mostrar mensaje de error al usuario
            setMessage(error.message)
        }
    }

    return (
        <div className="container">
            <div className="RouteTitle">
                <Title>NUEVO USUARIO</Title>
            </div>

            <FormWithFeedback onSubmit={handleRegisterSubmit} message={message}>
                <Field id="username" placeholder="Alias">Nombre de Usuario:</Field>
                <Field id="password" type="password" placeholder="Contraseña">Contraseña:</Field>
                <Field id="passwordRepeat" type="password" placeholder="Repetir contraseña"></Field>
                <AccessControl valueAccess={valueAccess} handleAccessChange={handleAccessChange} />
                <Button className="SubmitButton">GUARDAR 💾</Button>
            </FormWithFeedback>

            <Button className="return" onClick={() => navigate('/Admin')}>⬅️ VOLVER</Button>
        </div>
    )
}

export default RegisterUser