import { useEffect, useState } from 'react'
import logic from '../../../logic'
import View from '../../../components/library/View'
import Heading from '../../../components/core/Heading'
import Text from '../../../components/core/Text'
import Button from '../../../components/core/Button'
import ConfirmDelete from '../../../components/library/ConfirmDelete'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useContext from '../../../useContext'
import './index.css'

function ViewActivityStudent() {
    const { activityId } = useParams()
    const [activity, setActivity] = useState(null)
    const [loading, setLoading] = useState(true)
    const [confirmDeleteAnswers, setConfirmDeleteAnswers] = useState(false)
    const [completedActivity, setCompletedActivity] = useState(false)
    const [updateView, setUpdateView] = useState(0)
    const [exercisesCount, setExercisesCount] = useState('')
    const [exerciseType, SetExerciseType] = useState('')
    const [userId, setUserId] = useState('')

    const { alert } = useContext()

    useEffect(() => {
        loadActivity()
        checkCompleteActivity()
        getExercisesCount()
        getUserId()
        getExerciseType()
    }, [updateView])

    const loadActivity = () => {
        try {
            logic.getActivity(activityId)
                .then(activity => setActivity(activity))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    const getUserId = () => {
        try {
            const userId = logic.getUserId()
            setUserId(userId)
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

    const getExercisesCount = () => {
        try {
            logic.getExercisesCount(activityId)
                .then(count => setExercisesCount(count))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const checkCompleteActivity = () => {
        try {
            logic.checkCompleteActivity(activityId)
                .then(result => setCompletedActivity(result))
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
                .then(() => {
                    toggleDeleteAnswers()
                    setUpdateView(new Date())
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    if (loading)
        return <Heading level='2'>Loading...</Heading>

    if (!activity) {
        return <Heading level='2'>Activity not found</Heading>
    }

    const toggleDeleteAnswers = () => setConfirmDeleteAnswers(prevState => !prevState)

    return <View className='ActivityView'>
        <Heading level='2' className='ActivityHeading'>Activity</Heading>
        <View className='ActivityStudentTable'>
            <table  >
                <tbody>
                    <tr>
                        <th colSpan="2" className='ActivityStudentTitle'>
                            <Heading level='3' className='ActivityText'>{activity.title}</Heading>
                        </th>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <Heading level='4' className='ActivityText'>{activity.description}</Heading>
                        </td>
                    </tr>
                    <tr>
                        <th><Text>N° exercises</Text></th>
                        <th><Text>Status</Text></th>
                    </tr>
                    <tr>
                        <td >
                            <Heading level='3' className='ActivityText'>{exercisesCount}</Heading>
                        </td>
                        <td>
                            {completedActivity === true
                                ? <Text className='CompleteResult'>Complete</Text>
                                : <Text className='IncompleteResult'>Incomplete</Text>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </View>
        <Button><Link to={`/activities/${activityId}/do-activity/${exerciseType}`}>Start Activity</Link></Button>
        {completedActivity === true && <>
            <Button><Link to={`/activities/${activityId}/results`}>View Results</Link></Button>
            <Button onClick={toggleDeleteAnswers}> Restart Activity</Button>
        </>}
        <Button><Link to={`/activities/${userId}/list`}>Go Back</Link></Button>
        {confirmDeleteAnswers && <ConfirmDelete message="Delete all answers? (You can not recover them after this)" onAccept={handleDeleteAnswers} onCancel={toggleDeleteAnswers} />}
    </View >
}

export default ViewActivityStudent

