import logic from '../logic'
import Field from '../component/core/Field'
import SubmitButton from '../component/core/SubmitButton'
import FormWithFeedback from '../component/library/FormWithFeedback'
import Link from '../component/core/Link'
import Title from '../component/core/Title'
import View from '../component/library/View'

function Register({onUserRegistered, onLoginLinkClick}) {
    console.log('Register -> render')

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
            logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
                if (error) {
                    console.error(error)
                    alert(error.message)

                    return
                }

                onUserRegistered()
            })
        } catch (error) {
            console.error(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginLinkClick()
    }

    return <View tag='main'>
        <Title>Register</Title>

        <FormWithFeedback onSubmit={handleRegisterSubmit}>
            <Field id="name" placeholder="name">Name</Field>

            <Field id="surname" placeholder="surname">Surname</Field>

            <Field id="email" placeholder="email">E-mail</Field>

            <Field id="username" placeholder="username">Username</Field>

            <Field id="password" placeholder="password">Password</Field>

            <Field id="passwordRepeat" placeholder="passwordRepeat">Password Repeat</Field>

            <SubmitButton>Register</SubmitButton>
        </FormWithFeedback>
        <Link onClick={handleLoginClick} className="Link">Login</Link>
    </View>
}

export default Register