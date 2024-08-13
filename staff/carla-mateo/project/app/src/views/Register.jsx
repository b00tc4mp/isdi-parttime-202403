import { Link, useNavigate } from 'react-router-dom'

import { TiArrowForward } from "react-icons/ti"

import logic from '../logic/index'

import View from './library/View'

import Button from '../components/core/Button'
import Field from '../components/core/Field'
import Heading from '../components/core/Heading'
import Header from "./components/Header"
import Footer from './components/Footer'

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

        <form className="p-8" onSubmit={handleRegisterSubmit}>
            <Heading level={1} className="text-2xl">Create admin</Heading>
            <Field id="name" type="text" placeholder="name" />
            <Field id="username" type="text" placeholder="username" />
            <Field id="email" type="email" placeholder="name@example.com" />
            <Field id="password" type="password" placeholder="password" />
            <Field id="passwordRepeat" type="password" placeholder="password repeat" />
            <Button type="submit">Register</Button>

            <Link to="/login">
                <span className="absolute top-6 right-0 p-4">{<TiArrowForward size={32} />}</span>
            </Link>
        </form>

        <Footer></Footer>
    </View>



}

export default Register