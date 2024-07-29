import { Link } from 'react-router-dom'

import Field from "../components/core/Field/Field";
import SubmitButton from "../components/core/SubmitButton/SubmitButton";
import Title from "../components/core/Title/Title";
import '../components/core/Link/Link'
import FormWithFeedback from '../components/library/FormWithFeedback/FormWithFeedback'
import View from '../components/library/View/View'

import logic from '../logic/index.js';
import { useNavigate } from 'react-router-dom';

function Login({ }) {
    console.log('Login -> render')

    const navigate = useNavigate()

    const handleLoginSubmit = event => {
        event.preventDefault()

        const target = event.target

        const username = target.username.value
        const password = target.password.value

        try {
            logic.loginUser(username, password)
                .then(() => {
                    navigate('/')

                    console.log('Usuario logeado')
                })
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    return <View tag="main">
        <Title>Login</Title>

        <FormWithFeedback onSubmit={handleLoginSubmit}>
            <Field id='username' placeholder='USERNAME'></Field>

            <Field id='password' placeholder='PASSWORD'></Field>

            <SubmitButton>LOGIN</SubmitButton>

            <Link className="Link" to='/register'>REGISTER</Link>
        </FormWithFeedback>
    </View>

}

export default Login