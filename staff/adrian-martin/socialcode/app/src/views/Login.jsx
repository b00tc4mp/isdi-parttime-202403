import logic from '../logic'
import Field from '../component/core/Field'
import SubmitButton from '../component/core/SubmitButton'
import FormWithFeedback from '../component/library/FormWithFeedback'
import Link from '../component/core/Link'
import Title from '../component/core/Title'
import View from '../component/library/View'

function Login({ onUserLoggin, onRegisterLinkClick }) {
    console.log('Login -> render')

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password, error => {
                if (error) {
                    console.error(error)
                    alert(error.message)

                    return
                }

                onUserLoggin()
            })
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onRegisterLinkClick()
    }

    return <View tag='main'>
        <Title>Login</Title>

        <FormWithFeedback onSubmit={handleLoginSubmit}>

            <Field id="username" placeholder="username">Username</Field>

            <Field id="password" placeholder="password">Password</Field>

            <SubmitButton>Login</SubmitButton>
        </FormWithFeedback>

        <Link onClick={handleRegisterClick} className="Link">Register</Link>
    </View>
}

export default Login