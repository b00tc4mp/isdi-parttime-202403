import logic from "../logic"
import Field from "../components/core/Field"
import SubmitButton from "../components/core/SubmitButton"
import FormWithFeedback from "../components/library/FormWithFeedback"
import Link from "../components/core/Link"
import Title from "../components/core/Title"
import View from "../components/library/View"

function Login({ onUserLoggedIn, onRegisterLinkClick }) {
    console.log("Login -> render")

    const handleLoginSubmit = (event) => {
        event.preventDefault()

        const form = event.target
        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password, error => {
                if (error) {
                    console.error(error.message + ", please, correct it")

                    return
                }
                console.log("Log in succesful")

                //setView("home")
                onUserLoggedIn()
            })

        } catch (error) {
            console.error(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        //setView("register")
        onRegisterLinkClick()
    }
    return <View tag="main">
        <Title>Login</Title>
        <FormWithFeedback onSubmit={handleLoginSubmit}>

            <Field id="username" placeholder="username">username</Field>

            <Field id="password" type="password" placeholder="password">Password</Field>

            <SubmitButton>Login</SubmitButton>
        </FormWithFeedback>

        <Link onClick={handleRegisterClick}>Register</Link>
    </View>
}

export default Login