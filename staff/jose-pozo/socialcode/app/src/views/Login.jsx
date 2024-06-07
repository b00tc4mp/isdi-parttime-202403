import { useState } from 'react'
import logic from '../logic'
import View from '../components/library/View'
import Title from '../components/core/Title'
import Form from '../components/core/Form'
import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'
import Link from '../components/core/Link'


function Login({ onUsserLoggedIn, onRegisterLinkClick }) {
    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        console.log({ username, password })

        try {
            logic.loginUser(username, password, (error) => {
                if (error) {
                    console.log(error)

                    alert(error.message)

                    return
                }

                onUsserLoggedIn()
            })
        } catch (error) {
            console.log(error)

            alert(error.message)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterLinkClick()
    }



    return <View className='View'>
        <Form className={'LoginForm'} onSubmit={handleLoginSubmit}>
            <Field id='username' type='text' placeholder='username'>Username</Field>
            <Field id='password' type='password' placeholder='password'>Password</Field>
            <SubmitButton>Login</SubmitButton>
        </Form>
        <Link onClick={handleRegisterClick} children={'Don\'t have an account? Sign up'}></Link>

    </View>
}

export default Login