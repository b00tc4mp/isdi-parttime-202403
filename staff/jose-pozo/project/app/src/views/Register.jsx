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

        const name = form.name.value
        const surname = form.surname.value
        const email = form.email.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.registerUser(name, surname, email, password, passwordRepeat)
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

                <Field id='name' type='text' placeholder='name'></Field>

                <Field id='surname' type='text' placeholder='Surname'></Field>

                <Field id='email' type='email' placeholder='Email'></Field>

                <Field id='password' type='text' placeholder='Password'></Field>

                <Field id='passwordRepeat' type='text' placeholder='Confirm Password'></Field>

                <SubmitButton>Register</SubmitButton>
            </FormWithFeedback>

            <Link className='LinkLoginRegister' to='/login'>Login</Link>
        </ViewBox>
    </>
}

export default Register