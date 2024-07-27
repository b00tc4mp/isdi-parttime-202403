import { useState } from "react";

//logic
//errors

import Field from "../components/core/Field/Field";
import SubmitButton from "../components/core/SubmitButton/SubmitButton";
import Link from "../components/core/Link/Link";
import Title from "../components/core/Title/Title";

import FormWithFeedback from '../components/library/FormWithFeedback/FormWithFeedback'
import View from '../components/library/View/View'

import { useContext } from "react";

function Register({ onUserRegistered, onLoginLinkClick }) {
    console.log('Register -> render')

    const [message, setMessage] = useState('')

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const username = form.username.value
        const email = form.email.value
        const password = form.password.value

        try {
            //logic
        } catch (errror) {

        }

    }


    const handleLoginClick = event => {
        event.preventDefault()

        onLoginLinkClick
    }

    return <View tag="main">
        <Title>Register</Title>

        <FormWithFeedback onSubmit={handleRegisterSubmit} message={message}>
            <Field id='Username' placeholder='NAME'></Field>

            <Field id='Username' placeholder='USERNAME'></Field>

            <Field id='Username' type='email' placeholder='E-MAIL'></Field>

            <Field id='Username' placeholder='PASSWORD'></Field>

            <SubmitButton>REGISTER</SubmitButton>

            <Link onClick={handleLoginClick}>LOGIN</Link>
        </FormWithFeedback>
    </View>

}

export default Register