import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"

import logic from "../logic"

import Button from "../components/Button"
import Field from "../components/Field"
import Heading from "../components/Heading"

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

    return (
        <form className="registerForm" onSubmit={handleLoginSubmit} >
            <Heading level="1" className="Heading">WELLCOME BACK!</Heading>
            <p>Be part of our team</p>

            <Field id="username" type="text" placeholder="Username"></Field>
            <Field id="password" type="password" placeholder="Password"></Field>
            <Button type="submit">Sign in</Button>
        </form>
    )
}