import { useState } from 'react'

import logic from '../logic'

import Field from '../components/core/Field/index'
import SubmitButton from '../components/core/SubmitButton/index'

import FormWithFeedback from '../components/library/FormWithFeedback/index'
import View from '../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../useContext'

function Login({ onUserLoggedIn }) {

    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value
        const password = form.password.value

        try {
            logic.login(email, password)
                .then(() => onUserLoggedIn())
                .catch(error => {
                    console.log(error)

                    if (error instanceof SystemError) {
                        alert(error.message)

                        return
                    }

                    setMessage(error.message)
                })
        } catch (error) {
            console.log(error)

            setMessage(error.message)
        }
    }

    return <View tag="main" className="container-center min-h-screen" title="Daily Work">
        <FormWithFeedback onSubmit={handleLoginSubmit} message={message}>
            <Field id="email" placeholder="email">Email</Field>
            <Field id="password" type="password" placeholder="password">Password</Field>

            <SubmitButton>Login</SubmitButton>
        </FormWithFeedback>
    </View>
}

export default Login