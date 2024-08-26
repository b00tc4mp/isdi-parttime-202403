import { Link } from 'react-router-dom'

import Button from '../components/core/Button/Button.jsx';
import '../components/core/Link/Link'
import FormWithFeedback from '../components/library/FormWithFeedback/FormWithFeedback'

import logic from '../logic/index.js';
import { useNavigate } from 'react-router-dom';

import './Login.css'

function Login({ }) {
    console.log('Login -> render')

    const navigate = useNavigate()

    const handleLoginSubmit = event => {
        event.preventDefault()

        const target = event.target

        const username = target.username.value
        const password = target.password.value

        try {
            logic.loginUser(username, password)
                .then(() => {
                    navigate('/')

                    console.log('Usuario logeado')
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
            <h1 className='Login-Title'>Login</h1>

            <FormWithFeedback onSubmit={handleLoginSubmit} className='Login-all'>
                <input id='username' className='Login-input' placeholder='USERNAME'></input>

                <input id='password' className='Login-input' type='password' placeholder='PASSWORD'></input>

                <Button type='submit' className='Login-button'>LOGIN</Button>

                <Link className="Link" to='/register'>REGISTER</Link>
            </FormWithFeedback>
        </div>
    </div>

}

export default Login