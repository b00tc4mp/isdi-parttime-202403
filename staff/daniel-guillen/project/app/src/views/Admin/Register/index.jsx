import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Field from '../../../components/core/Field'
import SubmitButton from '../../../components/core/SubmitButton'
import Title from '../../../components/core/Title'
import FormWithFeedback from '../../../components/core/FormWithFeedback'

import { SystemError } from '../../../../../com/errors'
import AccessControl from '../components/AccessControl'

import registerUser from '../../../logic/registerUser'

const RegisterUser = () => {
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const [access, setAccess] = useState({
        stored: 'FALSE',
        truckLoad: 'FALSE', 
        vehicles: 'FALSE',  
        admin: 'FALSE'      
    })

    const handleAccessChange = (event) => {
        const { name, checked } = event.target
        setAccess(prevAccess => ({
            ...prevAccess,
            [name]: checked ? 'TRUE' : 'FALSE'
        }))
    }

    const handleRegisterSubmit = async (event) => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const surname = form.surname.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            await registerUser(name, surname, username, password, passwordRepeat, access)
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
                <Field id="name" placeholder="Nombre" />
                <Field id="surname" placeholder="Apellido" />
                <Field id="username" placeholder="Alias" />
                <Field id="password" type="password" placeholder="Contraseña" />
                <Field id="passwordRepeat" type="password" placeholder="Repetir contraseña" />
                <AccessControl access={access} handleAccessChange={handleAccessChange} />
                <SubmitButton>GUARDAR 💾</SubmitButton>
            </FormWithFeedback>

            <a className='menu-link' href="/Admin">VOLVER</a>
        </div>
    )
}

export default RegisterUser
