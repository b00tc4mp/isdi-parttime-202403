import { Link } from 'react-router-dom'

import useContext from './useContext.jsx'

import Button from '../components/core/Button/Button.jsx';
import '../components/core/Link/Link'
import Form from '../components/core/Form/Form.jsx'

import logic from '../logic/index.js';
import { useNavigate } from 'react-router-dom';

import './LoginRegister.css'

function Login({ }) {
    console.log('Login -> render')
    const { alert } = useContext()
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

            <Form onSubmit={handleLoginSubmit} className='Login-all'>
                <input id='username' className='Login-input' placeholder='USERNAME'></input>

                <input id='password' className='Login-input' type='password' placeholder='PASSWORD'></input>

                <Button type='submit' className='Login-button'>LOGIN</Button>

                <Link className="Link" to='/register'>REGISTER</Link>
            </Form>
        </div>
    </div>

}

export default Login