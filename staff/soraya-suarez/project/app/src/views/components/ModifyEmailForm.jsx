import { useState } from 'react'

import logic from '../../logic'

import Field from '../../components/core/Field'
import Button from '../../components/core/Button'
import SubmitButton from '../../components/core/SubmitButton'
import FormWithFeedback from '../../components/library/FormWithFeedback'
import View from '../../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../../useContext'

function ModifyEmailForm({ user, onProcessFinished }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputEmail, setInputEmail] = useState(user.email)
    const onInputEmailChange = ({ target }) => {
        setInputEmail(target.value)
    }

    const handleCancelModifyEmailClick = () => onProcessFinished()

    const handleModifyEmailSubmit = event => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value

        try {
            logic.modifyEmail(email)
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

    return <View className="bg-white">
        <FormWithFeedback onSubmit={handleModifyEmailSubmit} message={message}>
            <Field id="email" type="email" value={inputEmail} onChange={onInputEmailChange}>Email</Field>

            <View direction='row'>
                <SubmitButton>Modify email</SubmitButton>
                <Button onClick={handleCancelModifyEmailClick}>Cancel</Button>
            </View>
        </FormWithFeedback>
    </View>
}

export default ModifyEmailForm