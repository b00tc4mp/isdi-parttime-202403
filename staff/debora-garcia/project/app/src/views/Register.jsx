import { useNavigate, Link } from "react-router-dom"
import { SystemError } from 'com/errors'

import logic from "../logic"
import useContext from '../useContext'
import Button from "../components/Button"
import Field from "../components/Field"
import Heading from "../components/Heading"

export default function Register() {
    console.log("Register->render")

    const navigate = useNavigate()

    const { alert } = useContext()
    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target
        const name = form.name.value
        const surname = form.surname.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.registerUser(name, surname, email, username, password, passwordRepeat)
                .then(() => navigate("/login"))
                .catch(error => {
                    console.error(error)
                    if (error instanceof SystemError) {
                        alert(error.message)

                        return
                    }
                })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        navigate("/login")
    }

    return (

        <form className="registerForm" onSubmit={handleRegisterSubmit}>
            <Heading level="4" className="Heading">NEW ACCOUNT</Heading>
            <p>Be part of our team</p>
            <Field id="name" type="text" placeholder="Name"></Field>
            <Field id="surname" type="text" placeholder="Surname"></Field>
            <Field id="username" type="text" placeholder="Username"></Field>
            <Field id="email" type="email" placeholder="E-mail"></Field>
            <Field id="password" type="password" placeholder="Password"></Field>
            <Field id="passwordRepeat" type="password" placeholder="Confirm Password"></Field>
            <Button type="submit">Sign up</Button>
            <Link onClick={handleLoginClick} className="link-button">Login</Link>
        </form>
    )
}
