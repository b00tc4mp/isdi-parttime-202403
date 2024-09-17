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

function ReleaseTaskForm({ task, onProcessFinished }) {
    const { alert } = useContext()

    const [message, setMessage] = useState('')

    const [inputObervations, setInputObservations] = useState(task.observations)
    const onInputObservationsChange = ({ target }) => {
        setInputObservations(target.value)
    }

    const handleCancelModifyTaskClick = () => onProcessFinished()

    const handleModifyTaskSubmit = event => {
        event.preventDefault()

        const form = event.target

        const observations = form.observations.value

        try {
            logic.releaseTask(task.id, observations)
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

    return <View className='releaseTaskForm'>
        <FormWithFeedback onSubmit={handleModifyTaskSubmit} message={message}>
        <Field id='observations' value={inputObervations} onChange={onInputObservationsChange}>Observations</Field>

            <View direction='row'>
                <Button onClick={handleCancelModifyTaskClick}>Cancel</Button>
                <SubmitButton>Release Task</SubmitButton>
            </View>
        </FormWithFeedback>
    </View>
}

export default ReleaseTaskForm