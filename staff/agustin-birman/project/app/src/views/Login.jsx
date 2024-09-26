import { useState } from 'react'
import logic from '../logic'

import './Login.css'

import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'
import Link from '../components/core/Link'

import FormWithFeedback from '../components/library/FormWithFeedback'
import View from '../components/library/View'

function Login({ onUserLoggedIn, onRegisterLinkClick }) {
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
            console.error(error)

            setMessage(error.message)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterLinkClick()
    }

    return <View tag='main'>
        {/* <Heading level='1' className='Heading'>Hello!</Heading> */}
        <h1 >Hello</h1>

        <FormWithFeedback className='LoginForm' onSubmit={handleLoginSubmit} message={message}>
            <Field id='username' placeholder='username'>Username</Field>

            <Field id='password' type='password' placeholder='password'>Password</Field>

            <SubmitButton>Login</SubmitButton>
        </FormWithFeedback>

        <Link onClick={handleRegisterClick}>Register</Link>
    </View>
}

export default Login