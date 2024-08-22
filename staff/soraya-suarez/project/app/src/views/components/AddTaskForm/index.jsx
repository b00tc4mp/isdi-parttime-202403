import { useState } from 'react'

import logic from '../../../logic'

import Field from '../../../components/core/Field'
import Button from '../../../components/core/Button'
import SubmitButton from '../../../components/core/SubmitButton'
import FormWithFeedback from '../../../components/library/FormWithFeedback'
import View from '../../../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../../../useContext'

import './index.css'

function AddTaskForm({ onProcessFinished }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputName, setInputName] = useState('')
    const onInputNameChange = ({ target }) => {
        setInputName(target.value)
    }

    const [inputDescription, setInputDescription] = useState('')
    const onInputDescriptionChange = ({ target }) => {
        setInputDescription(target.value)
    }

    const [selectedOption, setSelectedOption] = useState('low')
    const onSelectedOptionChange = ({ target }) => {
        setSelectedOption(target.value)
    }

    const [visibleChecked, setVisibleChecked] = useState(false)
    const onVisibleCheckedChange = ({ target }) => {
        setVisibleChecked(target.value);
    }

    const [ownerChecked, setOwnerChecked] = useState(false)
    const onOwnerCheckedChange = ({ target }) => {
        setOwnerChecked(target.value);
    }

    const handleCancelAddTaskClick = () => onProcessFinished()

    const handleAddTaskSubmit = event => {
        event.preventDefault()

        const form = event.target

        let owner = null
        if (form.owner.checked)
            owner = logic.getUserId()

        let visible = true
        if (form.visible.checked === true){
            visible = false
            owner = logic.getUserId()
        }

        const name = form.name.value
        const description = form.description.value
        const status = 'toDo'
        const priority = form.priority.value

        try {
            logic.addTask(owner, name, description, status, priority, visible)
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

    return <View className="AddTaskForm bg-white">
        <FormWithFeedback onSubmit={handleAddTaskSubmit} message={message}>
            <Field id="name" value={inputName} onChange={onInputNameChange}>Name</Field>
            <Field id="description" value={inputDescription} onChange={onInputDescriptionChange}>Description</Field>
            
            <select name="priority" id="priority" value={selectedOption} onChange={onSelectedOptionChange} required>
                <option value="low">Priority low</option>
                <option value="medium">Priority medium</option>
                <option value="high">Priority high</option>
            </select>
            
            <Field id="visible" type="checkbox" checked={visibleChecked} onChange={onVisibleCheckedChange}>Private</Field>
            <Field id="owner" type="checkbox" checked={ownerChecked} onChange={onOwnerCheckedChange}>Auto assign</Field>

            <View direction='row'>
                <SubmitButton>Add task</SubmitButton>
                <Button onClick={handleCancelAddTaskClick}>Cancel</Button>
            </View>
        </FormWithFeedback>
    </View>
}

export default AddTaskForm