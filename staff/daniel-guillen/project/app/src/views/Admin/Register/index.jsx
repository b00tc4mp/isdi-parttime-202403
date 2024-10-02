import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// components
import Field from '../../../components/core/Field'
import Button from '../../../components/core/Button'
import Title from '../../../components/core/Title'
import FormWithFeedback from '../../../components/core/FormWithFeedback'
import AccessControl from '../../../components/users/AccessControl'
// utils, api and validation
import useAuthRedirect from '../../../utils/noTokenRedirect'
import createNewUser from '../../../logic/createNewUser'
import { validateUser } from '../../../../../com/validate/validateCreateUser'

const RegisterUser = () => {
    const navigate = useNavigate()

    const [message, setMessage] = useState('')
    const [level, setLevel] = useState('error') // por defecto los message del formfeedback son rojos
    const [valueAccess, setValueAccess] = useState('')

    const token = useAuthRedirect() // si no hay token redirigir a login

    const handleAccessChange = (newAccessLevel) => {
        setValueAccess(newAccessLevel)
    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault()

        const form = event.target
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {    
            validateUser(username, password, passwordRepeat, valueAccess) // validamos inputs antes de hacer la solicitud
                    
            await createNewUser(username, password, valueAccess, token) // creamos nuevo usuario
            setMessage('✍️ Registro completado! 🎉')
            setLevel('success') // 'success' aplicamos el estilo verde
        
            setTimeout(() => {
                navigate('/Admin/users')
            }, 2000)
        } catch (error) {
            console.error(error)
            setMessage(error.message) // mostrar error en form feedback rojo
            setLevel('error')
        }
    }

    return (
        <div className="container">
            <div className="RouteTitle">
                <Title>NUEVO USUARIO</Title>
            </div>

            <FormWithFeedback onSubmit={handleRegisterSubmit} message={message} level={level}>
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