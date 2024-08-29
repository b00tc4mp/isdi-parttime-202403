import { Link, useNavigate } from "react-router-dom"
import { SystemError } from 'com/errors'

import logic from "../logic"
import useContext from '../useContext'

import Button from "../components/Button"
import Field from "../components/Field"


export default function Login() {
    console.log("Login ->render")
    const navigate = useNavigate()

    const { alert } = useContext()

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target
        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)
                .then(() => navigate("/workouts"))
                .catch(error => {
                    console.error(error)
                    if (error instanceof SystemError) {
                        alert(error.message)

                        return
                    }
                    alert(error.message)
                })

        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }

    return <>
        <form className="loginForm" onSubmit={handleLoginSubmit} >
            <h4>WELLCOME BACK!</h4>
            <p>Be part of our team</p>

            <Field id="username" type="text" placeholder="Username"></Field>
            <Field id="password" type="password" placeholder="Password"></Field>
            <div className="account-prompt">
                <p>Don't have an account?</p>
                <Link to="/register" className="sign-up-link">
                    <p> SIGN UP</p>
                </Link>
            </div>
            <Button type="submit" className="sign-in-button">Sign in</Button>

        </form>
    </>
}