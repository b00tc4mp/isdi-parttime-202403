import { useState } from 'react'
import logic from '../logic'

import Field from '../components/core/Field/index'
import Button from '../components/core/Button'
import SubmitButton from '../components/core/SubmitButton/index'
import FormWithFeedback from '../components/library/FormWithFeedback/index'
import View from '../components/library/View/index'
import { SystemError } from 'com/errors'
import useContext from '../useContext'

function Enroll( onProcessFinished ) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputName, setInputName] = useState('')
    const onInputNameChange = ({ target }) => {
        setInputName(target.value)
    }

    const [inputSurname, setInputSurname] = useState('')
    const onInputSurnameChange = ({ target }) => {
        setInputSurname(target.value)
    }

    const [inputEmail, setInputEmail] = useState('')
    const onInputEmailChange = ({ target }) => {
        setInputEmail(target.value)
    }

    const [selectedOption, setSelectedOption] = useState('user')
    const onSelectedOptionChange = ({ target }) => {
        setSelectedOption(target.value)
    }

    const [inputPassword, setInputPassword] = useState('')
    const onInputPasswordChange = ({ target }) => {
        setInputPassword(target.value)
    }

    const [inputRepeatPassword, setInputRepeatPassword] = useState('')
    const onInputRepeatPasswordChange = ({ target }) => {
        setInputRepeatPassword(target.value)
    }

    const handleEnrollSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const surname = form.surname.value
        const email = form.email.value
        const role = form.role.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.enrollUser(name, surname, email, role, password, passwordRepeat)
                .then(() => onProcessFinished())
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

    return <View tag="main" className="container-center min-h-screen" title="Enroll user">
        <FormWithFeedback onSubmit={handleEnrollSubmit} message={message}>
            <Field id="name" placeholder="name" value={inputName} onChange={onInputNameChange}>Name</Field>
            <Field id="surname" placeholder="surname" value={inputSurname} onChange={onInputSurnameChange}>Surname</Field>
            <Field id="email" type="email" placeholder="name@example.com" value={inputEmail} onChange={onInputEmailChange}>E-mail</Field>

            <select name="role" id="role" value={selectedOption} onChange={onSelectedOptionChange} required>
                <option value="user">Type user</option>
                <option value="admin">Type admin</option>
            </select>

            <Field id="password" type="password" placeholder="password" value={inputPassword} onChange={onInputPasswordChange}>Password</Field>
            <Field id="passwordRepeat" type="password" placeholder="password repeat" value={inputRepeatPassword} onChange={onInputRepeatPasswordChange}>Password Repeat</Field>

            <SubmitButton>Enroll</SubmitButton>
        </FormWithFeedback>
    </View>
}

export default Enroll