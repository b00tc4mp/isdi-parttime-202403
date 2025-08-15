import { useState } from "react"
import logic from "../logic"
import Field from "../components/core/Field"
import SubmitButton from "../components/core/SubmitButton"
import FormWithFeedback from "../components/library/FormWithFeedback"
import Link from "../components/core/Link"
import Title from "../components/core/Title"
import View from "../components/library/View"


//para informar a la app del setView hay que linkarlos con callbacks
function Register({ onUserRegistered, onLoginLinkClick }) {
    console.log("Register -> render")

    const [message, setMessage] = useState("")

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.registerUser(email, username, password, passwordRepeat, error => {
                if (error) {
                    console.log(error)

                    setMessage(error.message)

                    return
                }

                //setView("login") (sustituimos por callbacks para informar a la app)
                //mediante el uso de callbacks (props) que recibimos desde la app, que es la que se encargara de manejar la respuests

                onUserRegistered()
            })
        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        //setView("login")
        onLoginLinkClick()
    }

    return <View tag="main">
        <Title>Register</Title>

        <FormWithFeedback onSubmit={handleRegisterSubmit} message={message}>
            <Field id="email" type="email" placeholder="koala@example.com">E-mail</Field>

            <Field id="username" placeholder="username">username</Field>

            <Field id="password" type="password" placeholder="password">Password</Field>

            <Field id="passwordRepeat" type="password" placeholder="passwordRepeat">Password repeat</Field>

            <SubmitButton>Register</SubmitButton>
        </FormWithFeedback>

        <Link onClick={handleLoginClick}>Login</Link>
    </View>

}

export default Register