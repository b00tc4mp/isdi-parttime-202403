import { useState } from 'react'

import './index.css'

import logic from '../../../logic'

import Heading from '../../../components/core/Heading'
import Button from '../../../components/core/Button'
import Field from '../../../components/core/Field'
import FieldWithTextArea from '../../../components/core/FieldWithTextArea'
import FormWithFeedback from '../../../components/library/FormWithFeedback'
import { Link, useNavigate, useParams } from 'react-router-dom'

function CreateActivity({ }) {
    const [message, setMessage] = useState('')

    const { exerciseType } = useParams()

    const navigate = useNavigate()

    const handleCreatedActivity = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const description = form.description.value

        try {
            logic.createActivity(title, description)
                .then(activityId => {
                    navigate(`/activities/${activityId}/${exerciseType}`)
                })
                .catch(error => {
                    console.error(error)

                    setMessage(error.message)
                })
        } catch (error) {
            console.error(error)

            setMessage(error.message)
        }
    }

    return <FormWithFeedback className='CreateActivity' onSubmit={handleCreatedActivity} message={message}>
        {exerciseType === 'completeSentence' && <Heading level='2'>Complete the sentence</Heading>}
        {exerciseType === 'orderSentence' && <Heading level='2'>Order the sentence</Heading>}
        {exerciseType === 'vocabulary' && <Heading level='2'>Vocabulary</Heading>}

        <Field id='title' type='text' placeholder='Conjugating the verb Haben' className='CreateActivityTitle'>Title</Field>

        <FieldWithTextArea id='description' type='text' placeholder='We will practice how to conjugate the verb haben in the first and third person forms'>Description</FieldWithTextArea>

        <div className='divButton'>
            <Button className='btn btn-secondary' type='button'><Link to='/'>Cancel</Link></Button>
            <Button className='btn btn-success'>Created</Button>
        </div>
    </FormWithFeedback >
}

export default CreateActivity