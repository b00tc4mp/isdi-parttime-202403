import logic from '../logic'

import './Register.css'

import View from '../components/library/View'
import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'
import FormWithFeedback from '../components/library/FormWithFeedback'
import Link from '../components/core/Link'
import { useState } from 'react'
import RadiusButtonUser from '../components/library/RadiusButtonUser'
import Heading from '../components/core/Heading'

function Register({ onUserRegistered, onLoginLinkClick }) {
    const [message, setMessage] = useState('')
    const [userType, setUserType] = useState('')


    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const surname = form.surname.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value


        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat, userType)
                .then(() => onUserRegistered())
                .catch(error => {
                    console.log(error)

                    setMessage(error.message)
                })
        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginLinkClick()
    }

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    }

    return <View tag='main'>
        <Heading level='1'>Register</Heading>

        <FormWithFeedback className='RegisterForm' onSubmit={handleRegisterSubmit} message={message}>
            <Field id='name' placeholder='name'>Name</Field>

            <Field id='surname' placeholder='surname'>Surname</Field>

            <Field id='email' type='email' placeholder='email'>Email</Field>

            <Field id='username' placeholder='username'>Username</Field>

            <Field id='password' type='password' placeholder='password'>Password</Field>

            <Field id='passwordRepeat' type='password' placeholder='passwordRepeat'>Password Repeat</Field>

            <RadiusButtonUser selectedValue={userType} onChange={handleUserTypeChange} >User</RadiusButtonUser>

            <SubmitButton>Register</SubmitButton>
        </FormWithFeedback>
        <Link onClick={handleLoginClick}>Login</Link>
    </ View>
}


export default Register




