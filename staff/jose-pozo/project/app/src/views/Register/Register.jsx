import './Register.css'

import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'

import UseContext from '../../contexts/UseContext'

import logic from '../../logic/index'

import Field from '../../components/core/Field'
import SubmitButton from '../../components/core/SubmitButton'

import FormWithFeedback from '../../components/library/FormWithFeedback'
import ViewBox from '../../components/library/ViewBox'
import Box from '../../components/core/Box'
import Picture from '../../components/core/Picture'
import Text from '../../components/core/Text'


function Register() {
    // const [message, setMessage] = useState('')

    const { alert } = UseContext()

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

                    alert(error.message)
                })

        } catch (error) {

            alert(error.message)
        }


    }


    return <>
        <Box className='RegisterView' tag='section'>

            <ViewBox className='RegisterViewBox' tag='main' >

                <Text className='RegisterTitle'>Daily Planner✏️</Text>
                <Text className='SloganText' >Powerful solutions for SMEsS</Text>

                <FormWithFeedback className='RegisterForm' onSubmit={handlerRegisterSubmit} >

                    <Field id='name' type='text' placeholder='Name'></Field>

                    <Field id='surname' type='text' placeholder='Surname'></Field>

                    <Field id='email' type='email' placeholder='Email'></Field>

                    <Field id='password' type='text' placeholder='Password'></Field>

                    <Field id='passwordRepeat' type='text' placeholder='Confirm Password'></Field>

                    <SubmitButton className='RegisterButton'>Register</SubmitButton>

                    <Box className='LoginLinkBox'>
                        <Text className='TextLinkLogin'>Already have an account?</Text>
                        <Link className='LinkLogin' to='/login'>Login</Link>
                    </Box>

                </FormWithFeedback>

            </ViewBox>
        </Box>
    </>
}

export default Register