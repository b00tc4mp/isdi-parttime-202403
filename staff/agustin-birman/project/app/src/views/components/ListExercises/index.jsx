import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './index.css'

import Heading from '../../../components/core/Heading'
import Button from '../../../components/core/Button'
import View from '../../../components/library/View'
import logic from '../../../logic'


function ListExercises() {
    const { activityId } = useParams()
    const [exercises, setExercises] = useState([])
    const [exerciseType, SetExerciseType] = useState('')

    useEffect(() => {
        loadExercises()
        getExerciseType()
    }, [])

    const loadExercises = () => {
        try {
            logic.getExercises(activityId)
                .then(data => {
                    const { exercises } = data
                    setExercises(exercises)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message) //TODO hacer un alert mejor
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const getExerciseType = () => {
        try {
            logic.getExerciseType(activityId)
                .then(type => SetExerciseType(type))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <View>
        <Heading level='2' className='ExerciseListTitle'>Exercises List</Heading>
        <div className='ExerciseList'>
            <table>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Sentence</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map(exercise =>
                        <tr key={exercise.id}>
                            <td>{exercise.index + 1}</td>
                            <td>{exercise.word !== undefined ? exercise.word : exercise.sentence}</td>
                        </tr>

                    )}
                </tbody>
            </table>
        </div>
        <Button><Link to={`/activities/${activityId}/${exerciseType}`}>Add a new exercise or edit</Link></Button>
        <Button><Link to={`/activities/${activityId}`}>Go back</Link></Button>
    </View >
}

export default ListExercises