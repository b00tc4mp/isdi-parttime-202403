import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import logic from '../logic'

import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'
import Link from '../components/core/Link'
import Title from '../components/core/Title'

import FormWithFeedback from '../components/library/FormWithFeedback'
import View from '../components/library/View'
import { SystemError } from 'com/errors'
import useContext from '../useContext'

function Login() {
    console.log('Login -> render')

    const { alert } = useContext()

    const navigate = useNavigate()

    const [message, setMessage] = useState('')

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => {
                    navigate('/')
                    console.log('User Login -> success')
                })
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

    const handleRegisterClick = (event) => {
        event.preventDefault()

        navigate('/register')
    }

    return <View className="Login" tag="main">
        <Title>Login</Title>

        <FormWithFeedback onSubmit={handleLoginSubmit} message={message}>
            <Field id="username" placeholder="username">Username</Field>

            <Field id="password" type="password" placeholder="password">Password</Field>

            <SubmitButton>Login</SubmitButton>
        </FormWithFeedback>

        <Link onClick={handleRegisterClick}>Register</Link>
    </View>
}

export default Login