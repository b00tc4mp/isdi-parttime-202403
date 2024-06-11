import logic from '../logic'
import Field from '../components/core/Field'
import FormWithFeedback from '../components/library/FormWithFeedBack'
import SubmitButton from '../components/core/SubmitButton'
import Link from '../components/core/Link'
import Title from '../components/core/Title'
import View from '../components/library/View'

function Register({ onUserRegistered, onLoginLinkClick }) {
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
                    console.log(error)

                    alert(error.message)

                    return
                }


                onUserRegistered()

            })


        } catch (error) {

            console.error(error)

            alert(error.message)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginLinkClick()
    }

    return <View tag='main'>

        <Title className='ViewTitle'>Register</Title>

        <FormWithFeedback onSubmit={handleRegisterSubmit}>
            <Field id='name' type='text' placeholder='name'>name</Field>
            <Field id='surname' type='text' placeholder='surname'>surname</Field>
            <Field id='email' type='email' placeholder='E-Mail'>E-Mail</Field>
            <Field id='username' type='text' placeholder='username'>username</Field>
            <Field id='password' type='password' placeholder='password'>password</Field>
            <Field id='passwordRepeat' type='password' placeholder='Repeat Password'>passwordRepeat</Field>

            <SubmitButton type='submit'>Register</SubmitButton>

        </FormWithFeedback>

        <Link onClick={handleLoginClick}>Login</Link>

    </View>
}

export default Register
