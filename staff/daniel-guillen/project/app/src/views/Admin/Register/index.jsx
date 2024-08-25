import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Field from '../../../components/core/Field'
import SubmitButton from '../../../components/core/SubmitButton'
import Title from '../../../components/core/Title'
import FormWithFeedback from '../../../components/core/FormWithFeedback'

import { SystemError } from '../../../../../com/errors'

import registerUser from '../../../logic/registerUser'
import AccessControl from '../components/AccessControl'

const RegisterUser = () => {
    const [message, setMessage] = useState('')
    const [valueAccess, setValueAccess] = useState('user') // Default access level
    const navigate = useNavigate()

    const handleAccessChange = (newAccessLevel) => {
        setValueAccess(newAccessLevel)
    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            await registerUser(email, username, password, passwordRepeat, valueAccess)
            alert('Registro completado! 🎉')
            navigate('/Admin/users')
        } catch (error) {
            console.error(error)
            if (error instanceof SystemError) {
                alert(error.message)
                return
            }
            setMessage(error.message)
        }
    }

    return (
        <div className='container'>
            <div className='RouteTitle'><Title>NUEVO USUARIO</Title></div>

            <FormWithFeedback onSubmit={handleRegisterSubmit} message={message}>

                <Field id="email" type="email" placeholder="Correo electrónico" />
                <Field id="username" placeholder="Alias" />
                <Field id="password" type="password" placeholder="Contraseña" />
                <Field id="passwordRepeat" type="password" placeholder="Repetir contraseña" />
                <AccessControl valueAccess={valueAccess} handleAccessChange={handleAccessChange}/>
                <SubmitButton>GUARDAR 💾</SubmitButton>
            </FormWithFeedback>

            <a className='menu-link' href="/Admin">VOLVER</a>
        </div>
    )
}

export default RegisterUser