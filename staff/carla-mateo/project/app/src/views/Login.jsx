
import { Link, useNavigate } from "react-router-dom"

import logic from '../logic/index'

import View from "./library/View"

import Button from '../components/core/button/Button'
import Field from '../components/core/field/Field'
import Heading from '../components/core/heading/Heading'
import Header from "./components/header/Header"

import './Login.css'


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

    return <View>
        <Header>
            <Heading level={1}>
                Login
            </Heading>
        </Header>

        <form className="Login" onSubmit={handleLoginSubmit}>
            <Field id="username" placeholder="username" />
            <Field id="password" type="password" placeholder="password" />
            <Button type="submit">Login</Button>
            <Link to="/register">Register</Link>
        </form>
    </View>
}

export default Login