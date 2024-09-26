import { useContext, useEffect, useState } from "react"
import View from "../View"
import Heading from "../../core/Heading"
import ConfirmDelete from "../ConfirmDelete"
import logic from "../../../logic"
import './index.css'
import { Context } from "../../../useContext"

function Exercises({ activityId, onEditButton, updateExercises }) {
    const [exercises, setExercises] = useState([])
    const [confirmDeleteExercise, setConfirmDeleteExercise] = useState(false)
    const [exerciseId, setExerciseId] = useState('')
    const { alert } = useContext(Context)
    useEffect(() =>
        loadExercises()
        , [updateExercises])

    const loadExercises = () => {
        try {
            logic.getExercises(activityId)
                .then(data => {
                    const { exercises } = data
                    setExercises(exercises)
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

    const handleDeletedExercise = () => {
        try {
            logic.deleteExercise(exerciseId)
                .then(() => {
                    loadExercises()
                    toggleDeleteExercise()
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

    const toggleDeleteExercise = (exerciseId) => {
        setConfirmDeleteExercise(prevState => !prevState)
        setExerciseId(exerciseId)
    }

    return <View className='ListExercise'>
        <Heading className='ListExerciseTitle' level='2'>List Exercises</Heading>
        <table className="ListExercisesTable">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Sentence</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map(exercise =>
                    <tr key={exercise.id}>
                        <td>{exercise.index + 1}</td>
                        <td>{exercise.word !== undefined ? exercise.word : exercise.sentence}</td>
                        <td>
                            <i
                                className="bi bi-pencil"
                                style={{ cursor: 'pointer', color: '#007bff' }}
                                onClick={() => onEditButton(exercise)}
                                title="Edit Exercise"
                            ></i>
                        </td>
                        <td> <i
                            className="bi bi-trash3"
                            style={{ cursor: 'pointer', color: '#007bff' }}
                            onClick={() => toggleDeleteExercise(exercise.id)}
                            title="Delete Teacher"
                        ></i>
                            {confirmDeleteExercise && <ConfirmDelete message='Do you want to delete this teacher?' onAccept={handleDeletedExercise} onCancel={toggleDeleteExercise}></ConfirmDelete>}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </View>
}

export default Exercises