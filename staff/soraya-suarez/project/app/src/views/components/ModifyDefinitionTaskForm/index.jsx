import { useState } from 'react'

import logic from '../../../logic'

import Button from '../../../components/core/Button'
import Field from '../../../components/core/Field'
import SubmitButton from '../../../components/core/SubmitButton'
import FormWithFeedback from '../../../components/library/FormWithFeedback'
import View from '../../../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../../../useContext'

import './index.css'

function ModifyDefinitionTaskForm({ task, onProcessFinished }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputName, setInputName] = useState(task.name)
    const onInputNameChange = ({ target }) => {
        setInputName(target.value)
    }

    const [inputDescription, setInputDescription] = useState(task.description)
    const onInputDescriptionChange = ({ target }) => {
        setInputDescription(target.value)
    }

    const [selectedOption, setSelectedOption] = useState(task.priority)
    const onSelectedOptionChange = ({ target }) => {
        setSelectedOption(target.value)
    }

    const handleCancelModifyTaskClick = () => onProcessFinished()

    const handleModifyTaskSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const description = form.description.value
        const priority = form.priority.value

        try {
            logic.modifyTaskAsCreator(task.id, name, description, priority)
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

    return <View className="ModifyDefinitionTaskForm">
        <FormWithFeedback onSubmit={handleModifyTaskSubmit} message={message}>
            <Field id="name" value={inputName} onChange={onInputNameChange}>Name</Field>
            <Field id="description" value={inputDescription} onChange={onInputDescriptionChange}>Description</Field>
            
            <select name="priority" id="priority" value={selectedOption} onChange={onSelectedOptionChange} required>
                <option value="low">Priority low</option>
                <option value="medium">Priority medium</option>
                <option value="high">Priority high</option>
            </select>

            <View direction='row'>
                <SubmitButton>Modify task</SubmitButton>
                <Button onClick={handleCancelModifyTaskClick}>Cancel</Button>
            </View>
        </FormWithFeedback>
    </View>
}

export default ModifyDefinitionTaskForm