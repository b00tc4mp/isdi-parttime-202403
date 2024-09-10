import { useState } from 'react'

import logic from '../../logic'

import Field from '../../components/core/Field'
import Button from '../../components/core/Button'
import SubmitButton from '../../components/core/SubmitButton'
import FormWithFeedback from '../../components/library/FormWithFeedback'
import View from '../../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../../useContext'

function ModifyPasswordForm({ user, onProcessFinished }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputOldPassword, setInputOldPassword] = useState('')
    const onInputOldPasswordChange = ({ target }) => {
        setInputOldPassword(target.value)
    }

    const [inputPassword, setInputPassword] = useState('')
    const onInputPasswordChange = ({ target }) => {
        setInputPassword(target.value)
    }

    const [inputRepeatPassword, setInputRepeatPassword] = useState('')
    const onInputRepeatPasswordChange = ({ target }) => {
        setInputRepeatPassword(target.value)
    }

    const handleCancelModifyPasswordClick = () => onProcessFinished()

    const handleModifyPasswordSubmit = event => {
        event.preventDefault()

        const form = event.target

        const oldPassword = form.oldPassword.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.modifyMyPassword(oldPassword, password, passwordRepeat)
                .then(() => onProcessFinished())
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

    return <div className='bg-white'>
        <FormWithFeedback onSubmit={handleModifyPasswordSubmit} message={message}>
            <Field id='oldPassword' type='password' placeholder='password' value={inputOldPassword} onChange={onInputOldPasswordChange}>Actual password</Field>
            <Field id='password' type='password' placeholder='password' value={inputPassword} onChange={onInputPasswordChange}>New password</Field>
            <Field id='passwordRepeat' type='password' placeholder='password repeat' value={inputRepeatPassword} onChange={onInputRepeatPasswordChange}>Repeat password</Field>

            <View direction='row'>
                <Button onClick={handleCancelModifyPasswordClick}>Cancel</Button>
                <SubmitButton>Modify password</SubmitButton>
            </View>
        </FormWithFeedback>
    </div>
}

export default ModifyPasswordForm