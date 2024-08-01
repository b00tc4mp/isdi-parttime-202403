import { useState } from 'react'

import logic from '../logic'

import Field from '../components/core/Field'
import Link from '../components/core/Link'
import Title from '../components/core/Title'

import './Register.css'

function Register({ onUserRegistered, onLoginClick }) {

    console.log('Register -> render')

    const [message, setMessage] = useState('')

    const handleRegisterSubmit = (event) => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const surname = form.surname.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        // try {
        //     logic.registerUser(name, surname, email, username, password, passwordRepeat)
        //         .then(() => onUserRegistered())
        //         .catch(error => {
        //             console.error(error)
        //             setMessage(error.message)
        //         })
        // } catch (error) {
        //     console.error(error)
        //     setMessage(error.message)
        // }

        try {
            // prettier-ignore
            logic.registerUser(username, email, password, confirmPassword)
                .then(() => {
                    navigate("/login")
                })
                .catch((error) => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }


    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    return (
        <div>
            <h1>Register</h1>
            <form className="RegisterForm" onSubmit={handleRegisterSubmit}>
                <Title>Register</Title>

                <Field id="name" placeholder="name">Name</Field>

                <Field id="surname" placeholder="surname">Surname</Field>

                <Field id="email" type="email" placeholder="name@example.com">E-mail</Field>

                <Field id="username" placeholder="username">Username</Field>

                <Field id="password" type="password" placeholder="password">Password</Field>

                <Field id="passwordRepeat" type="password" placeholder="password repeat">Password Repeat</Field>


                <Button type="submit">Register</Button>
            </form>
            <p>{message}</p>
            <Link onClick={handleLoginClick}>Login</Link>
        </div>
    )
}

export default Register