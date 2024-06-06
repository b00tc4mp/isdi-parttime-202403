import '../global.css'
import userLogic from '../userLogic'

import '../components/core/LoginForm.css'
import View from '../components/library/View'
import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'
import FormWithFeedback from '../components/library/FormWithFeedback'
import Link from '../components/core/Link'

function Login({ onUserLoggedIn, onRegisterLinkClick }) {
    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            userLogic.loginUser(username, password, error => {
                if (error) {
                    console.log(error)

                    alert(error.message)

                    return
                }

                onUserLoggedIn()
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
        <h1>Hello!</h1>

        <FormWithFeedback className='LoginForm' onSubmit={handleLoginSubmit}>
            <Field id='username' placeholder='username'>Username</Field>

            <Field id='password' type='password' placeholder='password'>Password</Field>

            <SubmitButton>Login</SubmitButton>
        </FormWithFeedback>

        <Link onClick={handleRegisterClick}>Register</Link>
    </View>
}

export default Login