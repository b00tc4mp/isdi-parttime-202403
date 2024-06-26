import logic from '../logic.js'
import Field from '../components/core/Field.jsx'
import SubmitButton from '../components/core/SubmitButton.jsx'
import FormWithFeedback from '../components/library/FormWithFeedback.jsx'
import Link from '../components/core/Link.jsx'
import Title from '../components/core/Title.jsx'
import View from '../components/library/View.jsx'

function Register({ onUserRegistered, onLoginLinkClick }) {

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
            logic.registerUser(name, surname, email, username, password, passwordRepeat,  error => {
                if(error) {
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

        return (
             <View Tag="main">
            <Title>Register</Title>

            <FormWithFeedback onSubmit={handleRegisterSubmit}>
                <Field id="name" placeholder="name">Name</Field>

                <Field id ="surname" placeholder="surname">Surname</Field>

                <Field id="email" type="email" placeholder="name@example.com">E-mail</Field>

                <Field id="username" placeholder="username">Username</Field>

                <Field id="password" type="password" placeholder="password">Password</Field>

                <Field id="passwordRepeat" type="password" placeholder="password repeat">Password Repeat</Field>

                <SubmitButton>Register</SubmitButton>
            </FormWithFeedback>

    <Link onClick={handleLoginClick}>Login</Link>
  </View>
    )
  }

export default Register