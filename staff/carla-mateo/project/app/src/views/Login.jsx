
import { Link, useNavigate } from "react-router-dom"

import logic from '../logic/index'

import Button from '../components/core/button/Button'
import Field from '../components/core/field/Field'
import Heading from '../components/core/heading/Heading'


function Login() {
    const navigate = useNavigate()

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginAdmin(username, password)
                .then(() => navigate('/'))
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    return <>
        <div>
            <Heading level={1} className="Login">
                Login
            </Heading>
        </div>

        <form className="Login" onSubmit={handleLoginSubmit}>
            <Field id="username" placeholder="username">Username</Field>
            <Field id="password" type="password" placeholder="password">Password</Field>
            <Button type="submit">Login</Button>
            <Link to="/register">Register</Link>
        </form>
    </>
}

export default Login