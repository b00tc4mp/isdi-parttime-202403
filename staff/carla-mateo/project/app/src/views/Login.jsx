
import { Link, useNavigate } from "react-router-dom"
import { TiArrowBack } from "react-icons/ti"

import logic from '../logic/index'

import View from "./library/View"

import Button from '../components/core/Button'
import Field from '../components/core/Field'
import Heading from '../components/core/Heading'
import Header from "./components/Header"
import Footer from "./components/Footer"

function Login() {
    const navigate = useNavigate()

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const password = form.password.value

        try {
            logic.loginAdmin(name, password)
                .then(() => navigate('/'))
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }

    return <View>

        <Header></Header>

        <form className=" p-8 " onSubmit={handleLoginSubmit}>
            <Heading className="text-2xl" level={1}>Enter your home</Heading>
            <Field id="name" type="text" placeholder="name" />
            <Field id="password" type="password" placeholder="password" />
            <Button type="submit">Login</Button>

            <Link to="/register">
                <span className="absolute top-6 right-0 p-4">{<TiArrowBack size={32} />}</span>
            </Link>
        </form>

        <Footer></Footer>
    </View>
}

export default Login