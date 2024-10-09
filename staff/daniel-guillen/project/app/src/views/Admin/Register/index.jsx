import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// Components
import Field from '../../../components/core/Field'
import Button from '../../../components/core/Button'
import Title from '../../../components/core/Title'
import FormWithFeedback from '../../../components/core/FormWithFeedback'
import AccessControl from '../../../components/users/AccessControl'
// Handlers
import { handleRegisterSubmit, handleAccessChange } from '../../../handlers/registerNewUserHandllers.js'

const RegisterUser = () => {
    const navigate = useNavigate()

    const [message, setMessage] = useState('')
    const [level, setLevel] = useState('error') // por defecto los message del formfeedback son rojos
    const [valueAccess, setValueAccess] = useState('')

    const token = sessionStorage.getItem('token') // obtener el token de sessionStorage

    return (
        <div className="container">
            <div className="RouteTitle">
                <Title>NUEVO USUARIO</Title>
            </div>

            <FormWithFeedback
            onSubmit={(event) => handleRegisterSubmit(event, valueAccess, setMessage, setLevel, token, navigate)} 
                message={message} 
                level={level}
            >
                <Field id="username" placeholder="Alias">Nombre de Usuario:</Field>
                <Field id="password" type="password" placeholder="Contraseña">Contraseña:</Field>
                <Field id="passwordRepeat" type="password" placeholder="Repetir contraseña"></Field>
                <AccessControl valueAccess={valueAccess} handleAccessChange={(newAccessLevel) => handleAccessChange(newAccessLevel, setValueAccess)} />
                <Button className="SubmitButton">GUARDAR 💾</Button>
            </FormWithFeedback>

            <Button className="return" onClick={() => navigate('/Admin')}>⬅️ VOLVER</Button>
        </div>
    )
}

export default RegisterUser