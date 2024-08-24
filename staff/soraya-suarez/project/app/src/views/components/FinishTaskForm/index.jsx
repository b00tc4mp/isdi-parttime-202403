import { useState } from 'react'

import logic from '../../../logic'

import Button from '../../../components/core/Button'
import SubmitButton from '../../../components/core/SubmitButton'
import FormWithFeedback from '../../../components/library/FormWithFeedback'
import View from '../../../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../../../useContext'

import './index.css'

function FinishTaskForm({ task, onProcessFinished }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputCompletionTime, setInputCompletionTime] = useState(0)
    const onInputCompletionTimeChange = ({ target }) => {
        setInputCompletionTime(target.value)
    }

    const handleCancelFinishTaskClick = () => onProcessFinished()

    const handleFinishTaskSubmit = event => {
        event.preventDefault()

        const form = event.target

        const completionTime = Number(form.completionTime.value)

        try {
            logic.finishTask(task.id, completionTime)
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

    return <View className="finishTaskForm">
        <FormWithFeedback onSubmit={handleFinishTaskSubmit} message={message}>
            <label>Completion time in hours: <input type="number" id="completionTime" value={inputCompletionTime} onChange={onInputCompletionTimeChange} min="0" step="0.1" required></input></label>
            <View direction='row'>
                <SubmitButton>Finish task</SubmitButton>
                <Button onClick={handleCancelFinishTaskClick}>Cancel</Button>
            </View>
        </FormWithFeedback>
    </View>
}

export default FinishTaskForm