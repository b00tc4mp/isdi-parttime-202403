import { useState } from 'react'

import logic from '../../logic'

import Field from '../../components/core/Field'
import Button from '../../components/core/Button'
import SubmitButton from '../../components/core/SubmitButton'
import FormWithFeedback from '../../components/library/FormWithFeedback'
import View from '../../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../../useContext'

function ModifyNameForm({ user, onProcessFinished }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputName, setInputName] = useState(user.name)
    const onInputNameChange = ({ target }) => {
        setInputName(target.value)
    }

    const handleCancelModifyNameClick = () => onProcessFinished()

    const handleModifyNameSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value

        try {
            logic.modifyMyName(name)
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
        <FormWithFeedback onSubmit={handleModifyNameSubmit} message={message}>
            <Field id="name" value={inputName} onChange={onInputNameChange}>Name</Field>

            <View direction='row'>
                <SubmitButton>Modify name</SubmitButton>
                <Button onClick={handleCancelModifyNameClick}>Cancel</Button>
            </View>
        </FormWithFeedback>
    </View>
}

export default ModifyNameForm