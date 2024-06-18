import logic from '../logic'
import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'
import FormWithFeedback from '../components/library/FormWithFeedBack'
import Link from '../components/core/Link'
import View from '../components/library/View'
import Title from '../components/core/Title'

function Login({ onUserLoggedIn, onRegisterLinkClick }) {
    console.log('Login -> render')

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password, error => {
                if (error) {
                    console.log(error)

                    alert(error.message)

                    return
                }

                onUserLoggedIn()
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

    return <View tag="main" className='main'>
        <Title className='MainTitle'>Login</Title>

        <FormWithFeedback onSubmit={handleLoginSubmit}>
            <Field id="username" placeholder="username">Username</Field>

            <Field id="password" type="password" placeholder="password">Password</Field>

            <SubmitButton>Login</SubmitButton>
        </FormWithFeedback>

        <Link onClick={handleRegisterClick}>Register</Link>
    </View>
}

export default Login