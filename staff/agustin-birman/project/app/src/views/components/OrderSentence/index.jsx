import './index.css'
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


function OrderSentence() {
    const [message, setMessage] = useState('')
    const [editView, setEditView] = useState(false)
    const [sentence, setSentence] = useState('')
    const [translate, setTranslate] = useState('')
    const [selectedExercise, setSelectedExercise] = useState(null)
    const [updateExercises, setUpdateExercises] = useState(0)

    const { activityId } = useParams()

    const handleEditedExercise = () => {
        try {
            logic.editExercise(selectedExercise.id, { sentence, translate })
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
        const translate = form.translate.value

        try {
            logic.createOrderSentence(activityId, sentence, translate)
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
        setSelectedExercise(exercise)
        setSentence(exercise.sentence)
        setTranslate(exercise.translate)
        setEditView(editView => !editView)
    }

    return <View>

        <FormWithFeedback message={message}>
            <Heading level='2' >-Order the sentence</Heading>

            {editView === false
                ? <Field id='sentence' placeholder='Alex hat es gegessen' >New sentence</Field>
                : <><Text>{selectedExercise.index + 1} Sentence</Text>
                    <Input value={sentence} onChange={(e) => { setSentence(e.target.value) }} /></>}

            {editView === false
                ? <Field id='translate' placeholder='Alex has eaten it' >New sentence</Field>
                : <><Text>{selectedExercise.index + 1} Sentence</Text>
                    <Input value={translate} onChange={(e) => { setTranslate(e.target.value) }} /></>}


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
export default OrderSentence

