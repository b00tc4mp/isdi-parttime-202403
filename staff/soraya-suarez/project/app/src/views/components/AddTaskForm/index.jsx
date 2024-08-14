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

function AddTaskForm({ onCancelAddTaskClick, onTaskAdded }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const handleCancelAddTaskClick = () => onCancelAddTaskClick()

    const handleAddTaskSubmit = event => {
        event.preventDefault()

        const form = event.target

        let owner = logic.getUserId()
        if (form.owner.checked === false){
            owner = null
        }

        let visible = true
        if (form.visible.checked === true){
            visible = false
            owner = logic.getUserId()
        }

        const name = form.name.value
        const description = form.description.value
        const status = 'toDo'
        const priority = form.priority.value
        const observations = ''


        try {
            logic.addTask(owner, name, description, status, priority, visible, observations)
                .then(() => onTaskAdded())
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

    return <View className="AddTaskForm">
        <FormWithFeedback onSubmit={handleAddTaskSubmit} message={message}>
            <Field id="name">Name</Field>
            <Field id="description">Description</Field>
            <select name="priority" id="priority" required>
                <option value="low" selected>Priority low</option>
                <option value="medium">Priority medium</option>
                <option value="high">Priority high</option>
            </select>

            <Field id="visible" type="checkbox">Private</Field>
            <Field id="owner" type="checkbox">Autoassign</Field>

            <View direction='row'>
                <SubmitButton>Add</SubmitButton>
                <Button onClick={handleCancelAddTaskClick}>Cancel</Button>
            </View>
        </FormWithFeedback>
    </View>
}

export default AddTaskForm