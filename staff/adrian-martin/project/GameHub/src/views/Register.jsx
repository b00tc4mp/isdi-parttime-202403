import { Link } from 'react-router-dom'

import Button from '../components/core/Button/Button.jsx';
import '../components/core/Link/Link'
import FormWithFeedback from '../components/library/FormWithFeedback/FormWithFeedback'

import logic from '../logic/index.js';
import { useNavigate } from 'react-router-dom';

function Register() {
    console.log('Register -> render')

    const navigate = useNavigate()

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const target = event.target

        const name = target.name.value
        const username = target.username.value
        const email = target.email.value
        const password = target.password.value

        try {
            logic.registerUser(name, username, email, password)
                .then(() => {
                    navigate('/login')

                    console.log('Usuario creado')
                })
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    return <div className='Login-form'>
        <div className='Login-formall'>
            <h1 className='Login-Title'>Register</h1>

            <FormWithFeedback onSubmit={handleRegisterSubmit} className='Register-all'>
                <input id='name' className='Login-input' placeholder='NAME'></input>

                <input id='username' className='Login-input' placeholder='USERNAME'></input>

                <input id='email' className='Login-input' type='email' placeholder='E-MAIL'></input>

                <input id='password' className='Login-input' placeholder='PASSWORD'></input>

                <Button type='submit' className='Login-button'>REGISTER</Button>

                <Link className='Link' to='/login'>LOGIN</Link>
            </FormWithFeedback>
        </div>
    </div>
}

export default Register