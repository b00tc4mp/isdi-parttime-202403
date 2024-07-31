import { useState } from "react";


function Register({ }) {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')

    handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const username = form.username.value
        const email = form.email.value
        const password = form.password.value
        const passwordRepeat = from.passwordRepeat.value

        try {
            logic.registerUser(name, username, email, username, password, passwordRepeat)
                .then(() => navigate('/login'))
                .catch(error => {
                    console.log(error)

                    setMessage(error.message)
                })
        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }
}

export default Register