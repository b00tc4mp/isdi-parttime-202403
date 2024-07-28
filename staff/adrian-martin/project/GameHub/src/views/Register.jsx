import { Link } from 'react-router-dom'

import Field from "../components/core/Field/Field";
import SubmitButton from "../components/core/SubmitButton/SubmitButton";
import Title from "../components/core/Title/Title";
import '../components/core/Link/Link'
import FormWithFeedback from '../components/library/FormWithFeedback/FormWithFeedback'
import View from '../components/library/View/View'

function Register() {

    return <View tag="main">
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