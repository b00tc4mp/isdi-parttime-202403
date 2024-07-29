import { Link } from 'react-router-dom'

import Field from "../components/core/Field/Field";
import SubmitButton from "../components/core/SubmitButton/SubmitButton";
import Title from "../components/core/Title/Title";
import '../components/core/Link/Link'
import FormWithFeedback from '../components/library/FormWithFeedback/FormWithFeedback'
import View from '../components/library/View/View'

import logic from '../logic/index.js';
import { useNavigate } from 'react-router-dom';

function Register() {
    console.log('Register -> render')

    const navigate = useNavigate()

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const target = event.target

        const name = target.name.value
        const username = target.username.value
        const email = target.email.value
        const password = target.password.value

        try {
            logic.registerUser(name, username, email, password)
                .then(() => {
                    navigate('/login')

                    console.log('Usuario creado')
                })
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    return <View tag="main">
        <Title>Register</Title>

        <FormWithFeedback onSubmit={handleRegisterSubmit}>
            <Field id='name' placeholder='NAME'></Field>

            <Field id='username' placeholder='USERNAME'></Field>

            <Field id='email' type='email' placeholder='E-MAIL'></Field>

            <Field id='password' placeholder='PASSWORD'></Field>

            <SubmitButton>REGISTER</SubmitButton>

            <Link className='Link' to='/login'>LOGIN</Link>
        </FormWithFeedback>
    </View>

}

export default Register