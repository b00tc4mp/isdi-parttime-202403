import { Link } from 'react-router-dom'

import Field from '../components/core/Field'
import SubmitButton from '../components/core/SubmitButton'

import FormWithFeedback from '../components/library/FormWithFeedback'
import ViewBox from '../components/library/ViewBox'

function Login({ }) {



    return <>
        <ViewBox className={'Login'} tag='main' >
            <FormWithFeedback>
                <Field id='username' type='text' placeholder='username'>Username</Field>

                <Field id='password' type='password' placeholder='password'>Password</Field>

                <SubmitButton>Login</SubmitButton>
            </FormWithFeedback>

            <Link className='Link' to='/register'>Register</Link>
        </ViewBox>
    </>
}

export default Login