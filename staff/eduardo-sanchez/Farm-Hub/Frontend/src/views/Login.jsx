import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import logic from "../logic"

import Field from '../components/core/Field'
import Button from '../components/core/Button'
// import Link from '../components/core/Link'
import Title from '../components/core/Title'

import { SystemError } from 'com/errors'

import useContext from '../useContext'

import './Login.css'

export const Login = () => {
    console.log('Login -> render')

    const { alert } = useContext()

    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    // const onLoginClick = ({ username, password }) => {
    //     console.log("Welcome ", `${username} with password ${password}`)
    // }

    const handleLoginSubmit = event => {
        console.log('Login -> handleLoginSubmit')
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => {
                    navigate("/")
                    console.log('User Login -> success')
                    alert("Welcome " + `${username}`)
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

    // const handleResisterClick = (event) => {
    //     event.preventDefault()

    //     navigate("/register")
    // }

    // const onLoginClick = (username) => {
    //     console.log("Welcome " + `${username}`)
    //     navigate("/")
    // }

    return (
        <div>
            <Title className="text-4xl text-green-300">Farm-Hub</Title>

            <form className="LoginForm" onSubmit={handleLoginSubmit}>
                <Title>Login</Title>

                <Field id="username" type="text" placeholder="username">Username</Field>

                <Field id="password" type="password" placeholder="password">Password</Field>

                <Button type="submit">Login</Button>

            </form>
            {message && <p className="ErrorMessage">{message}</p>}
            <Link className="Link" to="/register">Register</Link>

            {/* <div className="Link">


                <Link onClick={handleResisterClick}>Register</Link>
            </div> */}
        </div>
    )
}