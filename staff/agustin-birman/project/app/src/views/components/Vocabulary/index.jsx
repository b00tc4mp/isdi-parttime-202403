import logic from '../../../logic'

import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import Button from '../../../components/core/Button'
import Field from '../../../components/core/Field'
import Heading from '../../../components/core/Heading'
import Text from '../../../components/core/Text'
import Input from '../../../components/core/Input'

import FormWithFeedback from '../../../components/library/FormWithFeedback'
import View from '../../../components/library/View'
import Exercises from '../../../components/library/Exercises'

function Vocabulary() {
    const [message, setMessage] = useState('')
    const [editView, setEditView] = useState(false)
    const [word, setWord] = useState('')
    const [answers, setAnswers] = useState('')
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [updateExercises, setUpdateExercises] = useState(0)

    const { activityId } = useParams()

    const handleEditedExercise = () => {
        const separatedAnswers = answers.split(' ')
        try {
            logic.editExercise(selectedExercise.id, { word, answers: separatedAnswers })
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

        const word = form.word.value
        const answers = form.answers.value
        const separatedAnswers = answers.split(' ')

        try {
            logic.createVocabulary(activityId, word, separatedAnswers)
                .then(() => {
                    form.reset()
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

    const handleEditButton = (exercise) => {
        if (editView === false) {
            const answers = exercise.answer.join(' ')
            setAnswers(answers)
        }

        setSelectedExercise(exercise)
        setWord(exercise.word)
        setEditView(editView => !editView)
    }

    return <View>
        <FormWithFeedback message={message}>
            <Heading level='2' >-Vocabulary</Heading>

            {editView === false
                ? <Field id='word' placeholder='laufen' >New word</Field>
                : <><Text>{selectedExercise.index + 1} Sentence</Text>
                    <Input value={word} onChange={(e) => { setWord(e.target.value) }} /></>}

            {editView === false
                ? <Field id='answers' placeholder='run walk jog go' >Answers</Field>
                : <><Text>{selectedExercise.index + 1} Sentence</Text>
                    <Input value={answers} onChange={(e) => { setAnswers(e.target.value) }} /></>}

            <Text>Make sure that all the words are separated by a space</Text>

            {editView === false
                ?
                <View className='divButton'>
                    <Button type='button' className='btn btn-secondary'><Link to='/'>Cancel</Link></Button>
                    <Button type='button' className='btn btn-success' onClick={handleNextExercise}>Add a new exercise</Button>
                </View>

                : <View className='divButton'>
                    <Button type='button' className='btn btn-secondary' onClick={handleEditButton}>Cancel Edit</Button>
                    <Button type='button' className='btn btn-success' onClick={handleEditedExercise}>Save Changes</Button>
                </View>
            }
        </FormWithFeedback>

        {editView === false && <> <Exercises activityId={activityId} onEditButton={handleEditButton} updateExercises={updateExercises} />
        </>}
    </View>

}
export default Vocabulary