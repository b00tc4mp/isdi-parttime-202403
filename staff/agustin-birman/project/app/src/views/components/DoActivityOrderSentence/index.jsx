import { useNavigate, useParams } from 'react-router-dom'
import View from '../../../components/library/View'
import { useEffect, useState } from 'react'
import Heading from '../../../components/core/Heading'
import Text from '../../../components/core/Text'
import logic from '../../../logic'
import './index.css'
import Button from '../../../components/core/Button'

let SENTENCE_REGEX = /^(.*?)\s*\(.*?\)\s*(.*?)$/

function DoActivityOrderSentence() {
    const [message, setMessage] = useState('')
    const [selectedWords, setSelectedWords] = useState([])
    const [mixedWords, setMixedWords] = useState([])
    const [exercises, setExercises] = useState([])
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
    }, [currentPage, totalPages, navigate, activityId])

    useEffect(() => {
        setMessage('')
    }, [currentPage])

    const loadExercises = () => {
        try {
            logic.getExercises(activityId)
                .then(data => {
                    const { exercises, count } = data
                    setExercises(exercises)
                    setCurrentPage(count + 1)
                    setTotalPages(Math.ceil(exercises.length / pageSize))
                    if (exercises.length > 0) {
                        const separatedWords = exercises[0].sentence.split(' ')
                        setMixedWords(shuffleArray(separatedWords))
                    }
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
        if (mixedWords.length > 0) {
            setMessage('Please complete the order of the words before submitting your answer.')
            return
        }
        const answer = selectedWords.join(' ')
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

    const handleWordClick = (word) => {
        setMixedWords(prevMixedWords => {
            // Guardar palabra en una lista temporal para animar
            const wordToMove = prevMixedWords.find(w => w === word);
            const newMixedWords = prevMixedWords.filter(w => w !== word);
            setSelectedWords(prevSelectedWords => [...prevSelectedWords, wordToMove]);
            return newMixedWords;
        });
    };

    const handleSelectedWordClick = (word) => {
        setSelectedWords(prevSelectedWords => {
            // Guardar palabra en una lista temporal para animar
            const wordToMove = prevSelectedWords.find(w => w === word);
            const newSelectedWords = prevSelectedWords.filter(w => w !== wordToMove);
            setMixedWords(prevMixedWords => [...prevMixedWords, wordToMove]);
            return newSelectedWords;
        });
    };

    const handleChangePage = newPage => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage)
            const currentExercise = exercises[newPage - 1]
            if (currentExercise) {
                const separatedWords = currentExercise.sentence.split(' ')
                setSelectedWords([])
                setMixedWords(shuffleArray(separatedWords))
            }
        }
    }

    const currentExercises = exercises.slice((currentPage - 1) * pageSize, currentPage * pageSize)

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }

    return (<View >
        {currentExercises.map((exercise, index) => (
            <>
                <Heading level='3' className='DoActOrderSentenceTitle'>{exercise.index + 1} Exercise</Heading>
                <div className='DoActOrderSentenceContainer'>
                    <Heading className='DoActOrderSentence' level='3'> {exercise.translate} </Heading>
                    <div key={index} className='OrderSentenceContainer'>
                        <div className='SelectedWordsContainer'>
                            {selectedWords.map((word, selectedWordIndex) => (
                                <Button
                                    className='btn btn-success move-to-mixed'
                                    key={`selected-${selectedWordIndex}-${word}`}
                                    onClick={() => handleSelectedWordClick(word)}
                                >
                                    {word}
                                </Button>
                            ))}
                        </div>
                        <div className='MixedWordsContainer'>
                            {mixedWords.map((word, wordIndex) => (
                                <Button
                                    className='btn btn-secondary btnOrderSentence move-to-selected'
                                    key={`mixed-${wordIndex}-${word}`}
                                    onClick={() => { handleWordClick(word), console.log(word) }}>
                                    {word}
                                </Button>
                            ))}
                        </div>
                    </div>
                    {
                        currentPage > totalPages
                            ? <Button className='DoActOrderSentenceButton' onClick={() => handleSubmittedAnswer(exercise.id)}>Finish</Button>
                            : <Button className='DoActOrderSentenceButton' onClick={() => handleSubmittedAnswer(exercise.id)}>Next Exercise</Button>
                    }
                    <Text>{message}</Text>

                </ div>
                <Text>Page {currentPage} of {Math.ceil(exercises.length / pageSize)}</Text>
            </>
        ))}
    </ View>
    )
}

export default DoActivityOrderSentence