import { Link } from 'react-router-dom'

import Field from "../components/core/Field/Field";
import SubmitButton from "../components/core/SubmitButton/SubmitButton";
import Title from "../components/core/Title/Title";
import '../components/core/Link/Link'
import FormWithFeedback from '../components/library/FormWithFeedback/FormWithFeedback'
import View from '../components/library/View/View'

import logic from '../../logic/index.js';
import { useNavigate } from 'react-router-dom';

function Register() {
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
                })
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    return <View tag="main" onSubmit={handleRegisterSubmit}>
        <Title>Register</Title>

        <FormWithFeedback>
            <Field id='Username' placeholder='NAME'></Field>

            <Field id='Username' placeholder='USERNAME'></Field>

            <Field id='Username' type='email' placeholder='E-MAIL'></Field>

            <Field id='Username' placeholder='PASSWORD'></Field>

            <SubmitButton>REGISTER</SubmitButton>

            <Link className='Link' to='/login'>LOGIN</Link>
        </FormWithFeedback>
    </View>

}

export default Register