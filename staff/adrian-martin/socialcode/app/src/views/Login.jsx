import { useState } from 'react'

import logic from '../logic'

import Field from '../component/core/Field'
import SubmitButton from '../component/core/SubmitButton'
import Link from '../component/core/Link'
import Title from '../component/core/Title'

import FormWithFeedback from '../component/library/FormWithFeedback'
import View from '../component/library/View'

function Login({ onUserLoggin, onRegisterLinkClick }) {
    console.log('Login -> render')

    const [message, setMessage] = useState('')

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => onUserLoggin())
                .catch(error => {
                    console.error(error)

                    setMessage(error.message)
                })

        } catch (error) {
            console.error(error)
            setMessage(error.message)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterLinkClick()
    }

    return <View tag='main'>
        <Title>Login</Title>

        <FormWithFeedback onSubmit={handleLoginSubmit} message={message}>

            <Field id="username" type='text' placeholder="username">Username</Field>

            <Field id="password" type='password' placeholder="password">Password</Field>

            <SubmitButton>Login</SubmitButton>
        </FormWithFeedback>

        <Link onClick={handleRegisterClick} className="Link">Register</Link>
    </View>
}

export default Login