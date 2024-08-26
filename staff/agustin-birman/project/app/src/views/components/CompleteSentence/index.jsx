import './index.css'

import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Button from '../../../components/core/Button'
import Field from '../../../components/core/Field'
import Heading from '../../../components/core/Heading'
import Text from '../../../components/core/Text'
import FormWithFeedback from '../../../components/library/FormWithFeedback'
import Input from '../../../components/core/Input'

import logic from '../../../logic'
import View from '../../../components/library/View'
import Exercises from '../../../components/library/Exercises'

const ANSWER_REGEX = /\(([^)]+)\)/

function CreateCompleteSentence() {
    const [message, setMessage] = useState('')
    const [answerInput, setAnswerInput] = useState('Not answer found')
    const [editView, setEditView] = useState(false)
    const [sentence, setSentence] = useState('')
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [updateExercises, setUpdateExercises] = useState(0)

    const { activityId } = useParams()

    useEffect(() => {
        if (sentence) {
            const removeAnswer = sentence.match(ANSWER_REGEX)

            if (removeAnswer && removeAnswer[1])
                setAnswerInput(removeAnswer[1])
            else
                setAnswerInput('Not answer found')
        }
    }
        , [editView])

    const handleEditedExercise = () => {
        try {
            logic.editExercise(selectedExercise.id, { sentence })
                .then(() => {
                    setUpdateExercises(prev => prev + 1)
                    setEditView(false)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleNextExercise = () => {
        const form = document.querySelector('form')

        const sentence = form.sentence.value

        try {
            logic.createCompleteSentenceExercise(activityId, sentence)
                .then(() => {
                    form.reset()
                    setAnswerInput('Answer not found')
                    setUpdateExercises(prev => prev + 1)
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

    const handleAnswerInput = event => {
        const sentence = event.target.value

        const removeAnswer = sentence.match(ANSWER_REGEX)

        if (removeAnswer && removeAnswer[1])
            setAnswerInput(removeAnswer[1])
        else
            setAnswerInput('Not answer found')
    }

    const handleEditButton = (exercise) => {
        setSelectedExercise(exercise)
        setSentence(exercise.sentence)
        setEditView(editView => !editView)
    }

    return <View>

        <FormWithFeedback className='CreateCompleteSentence' message={message}>
            <Heading level='2' className='CompleteSentenceTitle'>-Complete the sentence</Heading>

            {editView === false
                ? <Field id='sentence' placeholder='Alex (hat) es gegessen' onChange={handleAnswerInput}>New Sentence</Field>
                : <><Text>{selectedExercise.index + 1}Sentence</Text>
                    <Input value={sentence} onChange={(e) => { setSentence(e.target.value); handleAnswerInput(e) }} /></>}
            <Heading level='3'>-Answer</Heading>
            <Text>{answerInput}</Text>

            <Text>Please make sure the answer is in parentheses</Text>

            {editView === false
                ?
                <View className='divButton'>
                    <Button type='button' className='btn btn-secondary'><Link to='/'>Cancel</Link></Button>
                    <Button type='button' className="btn btn-success" onClick={handleNextExercise}>Add a new exercise</Button>
                </View>

                : <View className='divButton'>
                    <Button type='button' className='btn btn-secondary' onClick={handleEditButton}>Cancel Edit</Button>
                    <Button type='button' className="btn btn-success" onClick={handleEditedExercise}>Save Changes</Button>
                </View>
            }
        </FormWithFeedback>

        {editView === false && <> <Exercises activityId={activityId} onEditButton={handleEditButton} updateExercises={updateExercises} />
        </>}
    </View>

}
export default CreateCompleteSentence

