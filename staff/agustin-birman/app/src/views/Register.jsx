import '../global.css'
import logic from '../logic'

import './Register.css'
import View from '../components/library/View'
import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'
import FormWithFeedback from '../components/library/FormWithFeedback'
import Link from '../components/core/Link'
import { useState } from 'react'

function Register({ onUserRegistered, onLoginLinkClick }) {
    const [message, setMessage] = useState('')

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
            logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
                if (error) {
                    console.log(error)

                    setMessage(error.message)

                    return
                }

                onUserRegistered()
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

    return <View tag='main'>
        <h1>Register</h1>

        <FormWithFeedback className='RegisterForm' onSubmit={handleRegisterSubmit} message={message}>
            <Field id='name' placeholder='name'>Name</Field>

            <Field id='surname' placeholder='surname'>Surname</Field>

            <Field id='email' type='email' placeholder='email'>Email</Field>

            <Field id='username' placeholder='username'>Username</Field>

            <Field id='password' type='password' placeholder='password'>Password</Field>

            <Field id='passwordRepeat' type='password' placeholder='passwordRepeat'>Password Repeat</Field>

            <SubmitButton>Register</SubmitButton>
        </FormWithFeedback>
        <Link onClick={handleLoginClick}>Login</Link>
    </ View>
}


export default Register