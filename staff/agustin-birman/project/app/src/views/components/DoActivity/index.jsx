import { useNavigate, useParams } from 'react-router-dom'
import View from '../../../components/library/View'
import { useEffect, useState } from 'react'
import Heading from '../../../components/core/Heading'
import Text from '../../../components/core/Text'
import logic from '../../../logic'
import Input from '../../../components/core/Input'
import Button from '../../../components/core/Button'
import './index.css'

let SENTENCE_REGEX = /^(.*?)\s*\(.*?\)\s*(.*?)$/

function DoActivity() {
    const [message, setMessage] = useState('')
    const [exercises, setExercises] = useState([])
    const [answer, setAnswer] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(2)
    const pageSize = 1
    const { activityId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadExercises()

    }, [])

    useEffect(() => {
        if (currentPage > totalPages) {
            navigate(`/activities/${activityId}/results`)
        }
    }, [currentPage])

    useEffect(() => {
        setAnswer('')
        setMessage('')
    }, [currentPage])

    const loadExercises = () => {
        try {
            logic.getExercises(activityId)
                .then(data => {
                    const { exercises, count } = data
                    setCurrentPage(count + 1)
                    setTotalPages(Math.ceil(exercises.length / pageSize))
                    setExercises(exercises)
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

    const handleSubmittedAnswer = (exerciseId) => {
        try {
            logic.submitAnswer(activityId, exerciseId, answer)
                .then(() => {
                    handleChangePage(currentPage + 1)

                    if (currentPage >= totalPages)
                        navigate(`/activities/${activityId}/results`)
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

    const handleChangePage = newPage => {
        setCurrentPage(newPage)
    }

    const currentExercises = exercises.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    return (<View>
        {currentExercises.map(exercise => {
            let beforeParentheses = ''
            let afterParentheses = ''

            let matches = exercise.sentence.match(SENTENCE_REGEX);

            if (matches) {
                beforeParentheses = matches[1].trim()
                afterParentheses = matches[2].trim()
            }

            return (<View className='DoActivityCompleteSentence' key={exercise.index}>
                <Heading className='DoActivityTitle' level='3'>{exercise.index + 1} Exercise</Heading>
                <div className='ExerciseContainer'>
                    <Text className='DoExerciseText'>{beforeParentheses}</Text>
                    <Input className='ExerciseInput' onChange={(e) => { setAnswer(e.target.value) }} />
                    <Text className='DoExerciseText'>{afterParentheses}</Text>
                </div>

                {
                    currentPage > totalPages
                        ? <Button className='DoActivityButton' onClick={() => handleSubmittedAnswer(exercise.id)}>Finish</Button>
                        : <Button className='DoActivityButton' onClick={() => handleSubmittedAnswer(exercise.id)}>Next Exercise</Button>

                }
                <Text>{message}</Text>

                <Text>Page {currentPage} of {Math.ceil(exercises.length / pageSize)}</Text>
            </View>)
        })}
    </View >
    )
}

export default DoActivity