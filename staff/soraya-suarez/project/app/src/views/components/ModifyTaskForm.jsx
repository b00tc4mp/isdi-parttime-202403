import { useState } from 'react'

import logic from '../../logic'

import Field from '../../components/core/Field'
import Button from '../../components/core/Button'
import SubmitButton from '../../components/core/SubmitButton'
import FormWithFeedback from '../../components/library/FormWithFeedback'
import View from '../../components/library/View'

import { SystemError } from 'com/errors'
import useContext from '../../useContext'

function ModifyTaskForm({ task, onProcessFinished }) {
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

    const [priorityOption, setPriorityOption] = useState(task.priority)
    const onPriorityOptionChange = ({ target }) => {
        setPriorityOption(target.value)
    }

    const [inputObervations, setInputObservations] = useState(task.observations)
    const onInputObservationsChange = ({ target }) => {
        setInputObservations(target.value)
    }

    const [statusOption, setStatusOption] = useState(task.status)
    const onStatusOptionChange = ({ target }) => {
        setStatusOption(target.value)
    }

    const handleCancelModifyClick = () => onProcessFinished()

    const handleModifyNameSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value

        try {
            logic.modifyMyEmail(task.id, name)
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

    const handleModifyDescriptionSubmit = event => {
        event.preventDefault()

        const form = event.target

        const description = form.description.value

        try {
            logic.modifyMyEmail(task.id, description)
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

    const handleModifyPrioritySubmit = event => {
        event.preventDefault()

        const form = event.target

        const priority = form.priority.value

        try {
            logic.modifyMyEmail(task.id, priority)
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

    const handleModifyObservationsSubmit = event => {
        event.preventDefault()

        const form = event.target

        const observations = form.observations.value

        try {
            logic.modifyMyEmail(task.id, observations)
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

    const handleModifyStatusSubmit = event => {
        event.preventDefault()

        const form = event.target

        const status = form.status.value

        try {
            logic.modifyMyEmail(task.id, status)
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

    return <>
        {task.creator === logic.getUserId() && task.status != 'finished' && <div className='bg-white'>
            <FormWithFeedback onSubmit={handleModifyNameSubmit} message={message}>
                <Field id='name' value={inputName} onChange={onInputNameChange}>Task name</Field>

                <View direction='row'>
                    <Button onClick={handleCancelModifyClick}>Cancel</Button>
                    <SubmitButton className='border-0'>Modify name</SubmitButton>
                </View>
            </FormWithFeedback>
        </div>}

        {task.creator === logic.getUserId() && task.status != 'finished' && <div className='bg-white'>
            <FormWithFeedback onSubmit={handleModifyDescriptionSubmit} message={message}>
                <Field id='description' value={inputDescription} onChange={onInputDescriptionChange}>Task description</Field>

                <View direction='row'>
                    <Button onClick={handleCancelModifyClick}>Cancel</Button>
                    <SubmitButton>Modify description</SubmitButton>
                </View>
            </FormWithFeedback>
        </div>}

        {task.creator === logic.getUserId() && task.status != 'finished' && <div className='bg-white'>
            <FormWithFeedback onSubmit={handleModifyPrioritySubmit} message={message}>
                <select className='w-full' name='priority' id='priority' value={priorityOption} onChange={onPriorityOptionChange} required>
                    <option value='low'>Priority low</option>
                    <option value='medium'>Priority medium</option>
                    <option value='high'>Priority high</option>
                </select>

                <View direction='row'>
                    <Button onClick={handleCancelModifyClick}>Cancel</Button>
                    <SubmitButton>Modify priority</SubmitButton>
                </View>
            </FormWithFeedback>
        </div>}

        {task.owner === logic.getUserId() && task.status != 'finished' && <div className='bg-white'>
            <FormWithFeedback onSubmit={handleModifyObservationsSubmit} message={message}>
                <Field id='observations' value={inputObervations} onChange={onInputObservationsChange}>Task observations</Field>

                <View direction='row'>
                    <Button onClick={handleCancelModifyClick}>Cancel</Button>
                    <SubmitButton>Modify observations</SubmitButton>
                </View>
            </FormWithFeedback>
        </div>}

        {task.owner === logic.getUserId() && task.status != 'finished' && <div className='bg-white'>
            <FormWithFeedback onSubmit={handleModifyStatusSubmit} message={message}>
                <select className='w-full' name='status' id='status' value={statusOption} onChange={onStatusOptionChange} required>
                    <option value='toDo'>Status to do</option>
                    <option value='inProgress'>Status in progress</option>
                </select>

                <View direction='row'>
                    <Button onClick={handleCancelModifyClick}>Cancel</Button>
                    <SubmitButton>Modify status</SubmitButton>
                </View>
            </FormWithFeedback>
        </div>}
        
    </>
}

export default ModifyTaskForm