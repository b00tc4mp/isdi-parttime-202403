import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { SystemError } from 'com/errors'

import logic from '../logic/index'

import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'

import FormWithFeedback from '../components/library/FormWithFeedback'
import ViewBox from '../components/library/ViewBox'


function Login() {
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const handlerLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value
        const password = form.password.value

        try {
            logic.loginUser(email, password)
                .then(() => navigate('/'))
                .catch(error => {
                    console.log(error)

                    if (error instanceof SystemError) {
                        alert(error.message)

                        return
                    }

                    setMessage(error.message)
                })
        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }


    return <>
        <ViewBox className={'Login'} tag='main' >
            <FormWithFeedback onSubmit={handlerLoginSubmit} message={message}>
                <Field id='email' type='email' placeholder='Email'></Field>

                <Field id='password' type='password' placeholder='Password'></Field>

                <SubmitButton>Login</SubmitButton>
            </FormWithFeedback>

            <Link className='LinkLoginRegister' to='/register'>Register</Link>
        </ViewBox>
    </>
}

export default Login