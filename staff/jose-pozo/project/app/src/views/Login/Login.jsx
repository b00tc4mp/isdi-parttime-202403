import './Login.css'

import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'

import UseContext from '../../UseContext'

import { SystemError } from 'com/errors'

import logic from '../../logic/index'

import Field from '../../components/core/Field'
import SubmitButton from '../../components/core/SubmitButton'

import FormWithFeedback from '../../components/library/FormWithFeedback'
import ViewBox from '../../components/library/ViewBox'
import Box from '../../components/core/Box'
import Text from '../../components/core/Text'


function Login() {
    // const [message, setMessage] = useState('')

    const { alert } = UseContext()

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

                    if (error instanceof SystemError) {
                        alert(error.message)

                        return
                    }

                    alert(error.message)
                })
        } catch (error) {

            alert(error.message)
        }
    }


    return <>
        <Box className='LoginView' tag='section'>

            <ViewBox className='LoginViewBox' tag='main' >

                <Text className='LoginTitle'>Daily Planner✏️</Text>
                <Text className='SloganText' >Powerful solutions for SMEsS</Text>

                <FormWithFeedback className='LoginForm' onSubmit={handlerLoginSubmit}>
                    <Field id='email' type='email' placeholder='Email'></Field>

                    <Field id='password' type='password' placeholder='Password'></Field>

                    <SubmitButton className='LoginButton'>Login</SubmitButton>

                    <Box className='RegisterLinkBox'>
                        <Text className='TextLinkRegister'>Don't have an account?</Text>
                        <Link className='LinkRegister' to='/register'>Register</Link>
                    </Box>

                </FormWithFeedback>

            </ViewBox>

        </Box>
    </>
}

export default Login