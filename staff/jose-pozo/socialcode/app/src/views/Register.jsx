import logic from '../logic'
import View from '../components/library/View'
import Title from '../components/core/Title'
import Form from '../components/core/Form'
import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'
import Link from '../components/core/Link'

function Register({ onUserRegistered, onLoginLinkClick }) {
    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const surname = form.surname.value
        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const passwordRepeat = form.passwordrepeat.value

        console.log({ name, surname, username, email, password, passwordRepeat })

        try {
            logic.registerUser(name, surname, username, email, password, passwordRepeat, (error) => {
                if (error) {
                    console.log(error)

                    alert(error.message)

                    return
                }

                onUserRegistered()
            })
        } catch (error) {
            console.log(error)

            alert(error.message)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginLinkClick()
    }

    return <View tag='main'>
        <Form className={'RegisterForm'} onSubmit={handleRegisterSubmit}>
            <Field id='name' type='text' placeholder='name'>Name</Field>
            <Field id='surname' type='text' placeholder='surname'>Surname</Field>
            <Field id='username' type='text' placeholder='username'>Username</Field>
            <Field id='email' type='mail' placeholder='email'>Email</Field>
            <Field id='password' type='password' placeholder='password'>Password</Field>
            <Field id='passwordrepeat' type='password' placeholder='password repeat'>Password Repeat</Field>
            <SubmitButton>Register</SubmitButton>
        </Form>
        <Link href='' onClick={handleLoginClick}>Have an account? Sign in'</Link>
    </View>
}

export default Register


