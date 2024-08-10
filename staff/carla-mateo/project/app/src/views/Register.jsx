import { Link, useNavigate } from "react-router-dom"

import logic from '../logic/index'

import View from './library/View'

import Button from '../components/core/button/Button'
import Field from '../components/core/field/Field'
import Heading from '../components/core/heading/Heading'
import Header from "./components/header/Header"

import './Register.css'

function Register() {
    const navigate = useNavigate()

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.registerAdmin(name, username, email, password, passwordRepeat)
                .then(() => navigate('/login'))
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }


    return <View>

        <Header></Header>

        <form className="Register" onSubmit={handleRegisterSubmit}>
            <Heading level={1} className="RegisterTitle">Register</Heading>
            <Field id="name" type="text" placeholder="name" />
            <Field id="username" type="text" placeholder="username" />
            <Field id="email" type="email" placeholder="name@example.com" />
            <Field id="password" type="password" placeholder="password" />
            <Field id="passwordRepeat" type="password" placeholder="password repeat" />
            <Button type="submit">Register</Button>
            <Link to="/login">Login</Link>
        </form>
    </View>

}

export default Register