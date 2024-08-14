import { useState } from 'react'
import logic from '../logic'

import Field from '../components/core/Field/index'
import SubmitButton from '../components/core/SubmitButton/index'
import FormWithFeedback from '../components/library/FormWithFeedback/index'
import View from '../components/library/View/index'
import { SystemError } from 'com/errors'
import useContext from '../useContext'

function Enroll({ onUserEnrolled }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const handleEnrollSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const surname = form.surname.value
        const email = form.email.value
        const role = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.enrollUser(name, surname, email, role, password, passwordRepeat)
                .then(() => onUserEnrolled())
                .catch(error => {
                    console.log(error)

                    if (error instanceof SystemError) {
                        alert(error.message)

                        return
                    }

                    setMessage(error.message)
                })
        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }

    return <View tag="main">
        <h1>Enroll user</h1>

        <FormWithFeedback onSubmit={handleEnrollSubmit} message={message}>
            <Field id="name" placeholder="name">Name</Field>

            <Field id="surname" placeholder="surname">Surname</Field>

            <Field id="email" type="email" placeholder="name@example.com">E-mail</Field>

            <select name="role" id="role" required>
                <option value="user" selected>Type user</option>
                <option value="admin">Type admin</option>
            </select>

            <Field id="password" type="password" placeholder="password">Password</Field>

            <Field id="passwordRepeat" type="password" placeholder="password repeat">Password Repeat</Field>

            <SubmitButton>Enroll</SubmitButton>
        </FormWithFeedback>
    </View>
}

export default Enroll