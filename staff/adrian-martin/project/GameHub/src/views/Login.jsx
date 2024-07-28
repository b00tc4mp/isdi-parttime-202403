import { useState } from "react";
import { Link } from 'react-router-dom'

import Field from "../components/core/Field/Field";
import SubmitButton from "../components/core/SubmitButton/SubmitButton";
import Title from "../components/core/Title/Title";
import '../components/core/Link/Link'
import FormWithFeedback from '../components/library/FormWithFeedback/FormWithFeedback'
import View from '../components/library/View/View'

import { useContext } from "react";

function Login({ }) {

    return <View tag="main">
        <Title>Login</Title>

        <FormWithFeedback>
            <Field id='Username' placeholder='USERNAME'></Field>

            <Field id='Username' placeholder='PASSWORD'></Field>

            <SubmitButton>LOGIN</SubmitButton>

            <Link className="Link" to='/register'>REGISTER</Link>
        </FormWithFeedback>
    </View>

}

export default Login