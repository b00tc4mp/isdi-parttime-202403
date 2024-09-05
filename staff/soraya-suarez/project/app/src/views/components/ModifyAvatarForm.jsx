import { useState } from 'react'

import logic from '../../logic'

import Field from '../../components/core/Field'
import Button from '../../components/core/Button'
import SubmitButton from '../../components/core/SubmitButton'
import FormWithFeedback from '../../components/library/FormWithFeedback'
import View from '../../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../../useContext'

function ModifyAvatarForm({ user, onProcessFinished }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputAvatar, setInputAvatar] = useState(user.avatar)
    const onInputAvatarChange = ({ target }) => {
        setInputAvatar(target.value)
    }

    const handleCancelModifyAvatarClick = () => onProcessFinished()

    const handleModifyAvatarSubmit = event => {
        event.preventDefault()

        const form = event.target

        const avatar = form.avatar.value

        try {
            logic.modifyMyAvatar(avatar)
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
        <FormWithFeedback onSubmit={handleModifyAvatarSubmit} message={message}>
            <Field id="avatar" value={inputAvatar} onChange={onInputAvatarChange}>Photo/avatar</Field>

            <View direction='row'>
                <SubmitButton>Modify photo/avatar</SubmitButton>
                <Button onClick={handleCancelModifyAvatarClick}>Cancel</Button>
            </View>
        </FormWithFeedback>
    </View>
}

export default ModifyAvatarForm