import { useState } from "react"
import { useNavigate } from "react-router-dom"

import logic from "../logic"

import Field from '../components/core/Field'
import Link from '../components/core/Link'
import Title from '../components/core/Title'

import { SystemError } from 'com/errors'

import './Login.css'

export const Login = () => {
    console.log('Login -> render')

    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    // const onLoginClick = ({ username, password }) => {
    //     console.log("Welcome ", `${username} with password ${password}`)
    // }

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => {
                    navigate("/")
                    console.log('User Login -> success')
                })
                .catch((error) => {
                    console.error(error)

                    if (error instanceof SystemError) {
                        alert(error.message)

                        return
                    }
                    setMessage(error.message)
                })
        } catch (error) {
            setMessage(error.message)
            console.error(error)
        }
    }

    const handleResisterClick = (event) => {
        event.preventDefault()

        navigate("/register")
    }

    return <>
        <div>
            <h1>Login</h1>

            <form className="LoginForm" onSubmit={handleLoginSubmit}>
                <Title>Login</Title>

                <Field id="username" placeholder="username">Username</Field>

                <Field id="password" type="password" placeholder="password">Password</Field>

                <button type="submit">Login</button>

            </form>
            <p>{message}</p>
            <Link onClick={handleResisterClick}>Register</Link>
        </div>
    </>
}