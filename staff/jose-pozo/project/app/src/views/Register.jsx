import { Link } from 'react-router-dom'

import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'

import FormWithFeedback from '../components/library/FormWithFeedback'
import ViewBox from '../components/library/ViewBox'

function Register() {
    // const [message, setMessage] = useState('')

    const handlerRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value


    }



    return <>
        <ViewBox className={'Register'} tag='main' >
            <FormWithFeedback onSubmit={handlerRegisterSubmit} message={message} >
                <Field id='username' type='text' placeholder='username'> Username</Field>

                <Field id='email' type='email' placeholder='email'> Email</Field>

                <Field id='password' type='password' placeholder='password'> Password</Field>

                <Field id='passwordRepeat' type='password' placeholder='password repeat'> Password Repeat</Field>

                <SubmitButton>Register</SubmitButton>
            </FormWithFeedback>

            <Link className='Link' to='/login'>Login</Link>
        </ViewBox>
    </>
}

export default Register