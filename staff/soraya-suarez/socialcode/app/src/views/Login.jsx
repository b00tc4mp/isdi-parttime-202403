import { useState } from 'react'

import logic from '../logic'

import Field from '../components/core/Field/index'
import SubmitButton from '../components/core/SubmitButton/index'
import Link from '../components/core/Link'

import FormWithFeedback from '../components/library/FormWithFeedback/index'
import View from '../components/library/View/index'

function Login({ onUserLoggedIn, onRegisterLinkClick }) {
    console.log('Login -> render')

    const [message, setMessage] = useState('')

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => onUserLoggedIn())
                .catch(error => {
                    console.log(error)

                    setMessage(error.message)
                })
        } catch (error) {
            console.log(error)

            setMessage(error.message)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterLinkClick()
    }

    return <View tag="main">
        <FormWithFeedback onSubmit={handleLoginSubmit} message={message}>
            <Field id="username" placeholder="username">Username</Field>

            <Field id="password" type="password" placeholder="password">Password</Field>

            <SubmitButton>Login</SubmitButton>
        </FormWithFeedback>

        <Link onClick={handleRegisterClick}>Register</Link>
    </View>
}

export default Login