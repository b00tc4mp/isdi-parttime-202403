import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"

import logic from "../logic"

import Button from "../components/Button"
import Field from "../components/Field"

//TODO alert & use context
export default function Login() {
    console.log("Login ->render")
    const navigate = useNavigate()
    const [message, setMessage] = useState("")


    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target
        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => navigate("/workouts"))
                .catch(error => {
                    console.error(error)

                    setMessage(error.message)
                })

        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }

    return <>
        <form className="loginForm" onSubmit={handleLoginSubmit} >
            <h1>WELLCOME BACK!</h1>
            <p>Be part of our team</p>

            <Field id="username" type="text" placeholder="Username"></Field>
            <Field id="password" type="password" placeholder="Password"></Field>
            <Button type="submit">Sign in</Button>
        </form>
    </>
}