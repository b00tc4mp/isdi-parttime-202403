import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import logic from '../logic/index'

import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'

import FormWithFeedback from '../components/library/FormWithFeedback'
import ViewBox from '../components/library/ViewBox'

function Register() {
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const handlerRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.registerUser(username, email, password, passwordRepeat)
                .then(() => navigate('/login'))
                .catch(error => {
                    console.log(error)

                    setMessage(error.message)
                })

        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }


    }



    return <>
        <ViewBox className={'Register'} tag='main' >
            <FormWithFeedback onSubmit={handlerRegisterSubmit} message={message} >
                <Field id='username' type='text' placeholder='username'> Username</Field>

                <Field id='email' type='email' placeholder='email'> Email</Field>

                <Field id='password' type='text' placeholder='password'> Password</Field>

                <Field id='passwordRepeat' type='text' placeholder='password repeat'> Password Repeat</Field>

                <SubmitButton>Register</SubmitButton>
            </FormWithFeedback>

            <Link className='Link' to='/login'>Login</Link>
        </ViewBox>
    </>
}

export default Register