import { useState } from 'react'
import logic from '../../logic'

import Field from '../../components/core/Field'
import Button from '../../components/core/Button'
import SubmitButton from '../../components/core/SubmitButton'
import FormWithFeedback from '../../components/library/FormWithFeedback'
import View from '../../components/library/View'

import { SystemError } from 'com/errors'

import useContext from '../../useContext'

function ModifyUserForm( user ) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputName, setInputName] = useState(user.user.name)
    const onInputNameChange = ({ target }) => {
        setInputName(target.value)
    }

    const [inputSurname, setInputSurname] = useState(user.user.surname)
    const onInputSurnameChange = ({ target }) => {
        setInputSurname(target.value)
    }

    const [inputEmail, setInputEmail] = useState(user.user.email)
    const onInputEmailChange = ({ target }) => {
        setInputEmail(target.value)
    }

    const [inputPhone, setInputPhone] = useState(user.user.phone)
    const onInputPhoneChange = ({ target }) => {
        setInputPhone(target.value)
    }

    const [inputAvatar, setInputAvatar] = useState(user.user.avatar)
    const onInputAvatarChange = ({ target }) => {
        setInputAvatar(target.value)
    }

    const [inputPassword, setInputPassword] = useState(user.user.password)
    const onInputPasswordChange = ({ target }) => {
        setInputPassword(target.value)
    }

    const [inputRepeatPassword, setInputRepeatPassword] = useState()
    const onInputRepeatPasswordChange = ({ target }) => {
        setInputRepeatPassword(target.value)
    }

    const handleCancelModifyProfileClick = () => user.onProcessFinished()

    const handleModifyProfileSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const surname = form.surname.value
        const email = form.email.value
        const phone = form.phone.value
        const avatar = form.avatar.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.modifyUser(name, surname, email, phone, avatar, password, passwordRepeat)
                .then(() => user.onProcessFinished())
                .catch(error => {
                    console.error(error)

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

    return <View>
        <FormWithFeedback onSubmit={handleModifyProfileSubmit} message={message}>
            <Field id="name" value={inputName} onChange={onInputNameChange}>Name</Field>
            <Field id="surname" placeholder="surname" value={inputSurname} onChange={onInputSurnameChange}>Surname</Field>
            <Field id="email" type="email" value={inputEmail} onChange={onInputEmailChange}>E-mail</Field>
            <Field id="phone" value={inputPhone} onChange={onInputPhoneChange}>Phone</Field>
            <Field id="avatar" value={inputAvatar} onChange={onInputAvatarChange}>Avatar</Field>
            <Field id="password" type="password" placeholder="password" value={inputPassword} onChange={onInputPasswordChange}>Password</Field>
            <Field id="passwordRepeat" type="password" placeholder="password repeat" value={inputRepeatPassword} onChange={onInputRepeatPasswordChange}>Password Repeat</Field>

            <View direction='row'>
                <SubmitButton>Modify profile</SubmitButton>
                <Button onClick={handleCancelModifyProfileClick}>Cancel</Button>
            </View>
        </FormWithFeedback>
    </View>
}

export default ModifyUserForm