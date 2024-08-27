import { Link } from 'react-router-dom'

import useContext from './useContext.jsx'

import Button from '../components/core/Button/Button.jsx';
import '../components/core/Link/Link'
import Form from '../components/core/Form/Form.jsx';
import Input from '../components/core/Input/Input.jsx';

import logic from '../logic/index.js';
import { useNavigate } from 'react-router-dom';

import './LoginRegister.css'

function Register() {
    console.log('Register -> render')

    const { alert } = useContext()
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

            <Form onSubmit={handleRegisterSubmit} className='Register-all'>
                <Input id='name' className='Login-input' placeholder='NAME'></Input>

                <Input id='username' className='Login-input' placeholder='USERNAME'></Input>

                <Input id='email' className='Login-input' type='email' placeholder='E-MAIL'></Input>

                <Input id='password' className='Login-input' type='password' placeholder='PASSWORD'></Input>

                <Button type='submit' className='Login-button'>REGISTER</Button>

                <Link className='Link' to='/login'>LOGIN</Link>
            </Form>
        </div>
    </div>
}

export default Register