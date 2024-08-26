import { useEffect, useState } from "react"
import logic from "../../../logic"
import { useNavigate, useParams } from "react-router-dom"
import Heading from "../../../components/core/Heading"
import View from "../../../components/library/View"
import './index.css'
import Button from "../../../components/core/Button"

function ShowExerciseResults() {
    const [exercisesWithAnswers, setExercisesWithAnswers] = useState([])
    const [exerciseType, SetExerciseType] = useState('')
    const { activityId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        loadExercisesWithAnswers()
        getExerciseType()
    }, [activityId])

    const loadExercisesWithAnswers = () => {
        try {
            logic.getExercises(activityId)
                .then(data => {
                    const { exercises } = data
                    const promises = exercises.map(exercise =>
                        logic.getAnswers(exercise.id)
                            .then(answers => ({
                                ...exercise,
                                answers
                            }))// TODO hacer una logica que haga todo esto en uno
                    );
                    return Promise.all(promises)
                })
                .then(exercisesWithAnswers => setExercisesWithAnswers(exercisesWithAnswers))
                .catch(error => {
                    console.error(error)
                    alert(error.message) // TODO: mejorar el alert
                });
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

    const handleDeleteAnswers = () => {
        try {
            logic.deleteAnswers(activityId)
                .then(() => { navigate(`/activities/${activityId}/do-activity/${exerciseType}`) })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return (
        <View>
            <Heading level='2' className='ResultTitle'>Results</Heading>
            {exercisesWithAnswers.map(exercise => (
                <table className="ResultTable" key={exercise.id}>
                    <thead>
                        <tr>
                            <th colSpan="2">{exercise.index + 1} Sentence</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="SentenceResult">
                            <td colSpan="2">{exercise.word !== undefined ? exercise.word : exercise.sentence}</td>
                        </tr>
                        {exerciseType === 'completeSentence' || exerciseType === 'Vocabulary'
                            ? <tr>
                                <th>Answer</th>
                                <th>Your answer</th>
                            </tr>
                            :
                            <tr>
                                <th>Your answer</th>
                            </tr>
                        }

                        <tr>
                            {exerciseType === 'completeSentence' || exerciseType === 'Vocabulary'
                                ? <td>{exercise.answer}</td>
                                : null}
                            <td>
                                {exerciseType === 'completeSentence' &&

                                    exercise.answers.map((answer, index) => (
                                        <div key={index} className={answer.answer === exercise.answer ? 'exerciseCorrect' : 'exerciseWrong'}>
                                            {answer.answer}
                                        </div>
                                    ))}
                                {exerciseType === 'orderSentence' &&
                                    exercise.answers.map((answer, index) => (
                                        <div key={index} className={answer.answer === exercise.sentence ? 'exerciseCorrect' : 'exerciseWrong'}>

                                            {answer.answer}
                                        </div>))}
                                {exerciseType === 'vocabulary' &&
                                    exercise.answers.map((answer, index) => (
                                        <div key={index} className={exercise.answer.includes(answer.answer) ? 'exerciseCorrect' : 'exerciseWrong'}>
                                            {answer.answer}
                                        </div>))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))}
            <Heading level='4'>Do you want to try it again?</Heading>
            <Button onClick={handleDeleteAnswers}>YES</Button>
        </View>
    )
}
export default ShowExerciseResults
