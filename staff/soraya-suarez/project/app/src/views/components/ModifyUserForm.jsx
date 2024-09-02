import { useState } from 'react'
import logic from '../../logic'

import Field from '../../components/core/Field'
import Button from '../../components/core/Button'
import SubmitButton from '../../components/core/SubmitButton'
import FormWithFeedback from '../../components/library/FormWithFeedback'
import View from '../../components/library/View'

import { SystemError } from 'com/errors'

import useContext from '../../useContext'

function ModifyUserForm( user, onProcessFinished ) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputName, setInputName] = useState(user.name)
    const onInputNameChange = ({ target }) => {
        setInputName(target.value)
    }

    const handleCancelModifyUserClick = () => onProcessFinished()

    const handleModifyUserSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value

        try {
            logic.modifyUser(name)
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

    return <View>
        <FormWithFeedback onSubmit={handleModifyUserSubmit} message={message}>
            <Field id="name" value={inputName} onChange={onInputNameChange}>Name</Field>

            <View direction='row'>
                <SubmitButton>Modify profile</SubmitButton>
                <Button onClick={handleCancelModifyUserClick}>Cancel</Button>
            </View>
        </FormWithFeedback>
    </View>
}

export default ModifyUserForm