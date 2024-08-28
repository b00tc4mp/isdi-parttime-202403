import { useEffect, useState } from 'react'
import logic from '../../../logic'
import './index.css'
import View from '../../../components/library/View'
import Heading from '../../../components/core/Heading'
import Text from '../../../components/core/Text'
import Button from '../../../components/core/Button'
import Input from '../../../components/core/Input'
import ConfirmDelete from '../../../components/library/ConfirmDelete'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useContext from '../../../useContext'
import TextArea from '../../../components/core/TextArea'

function ViewActivityTeacher() {
    const { activityId } = useParams()
    const [activity, setActivity] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editView, setEditView] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [confirmDeleteActivity, setConfirmDeleteActivity] = useState(false)
    const [exercisesCount, setExercisesCount] = useState('')

    const navigate = useNavigate()
    const { alert } = useContext()

    useEffect(() => {
        loadActivity()
        getExercisesCount()
    }, [])

    useEffect(() => {
        if (activity) {
            setTitle(activity.title)
            setDescription(activity.description)
        }
    }, [activity])

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


    const handleDeleteActivity = () => {
        try {
            logic.deleteActivity(activityId)
                .then(() => navigate('/activities/list'))
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleEditButton = () => {
        setEditView(editView => !editView)
    }

    const handleSaveChanges = () => {
        try {
            logic.editActivity(activityId, title, description)
                .then(() => {
                    loadActivity()
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

    if (loading)
        return <Heading level='2'>Loading...</Heading>

    if (!activity) {
        return <Heading level='2'>Activity not found</Heading>
    }

    const toggleDeleteActivity = () => setConfirmDeleteActivity(prevState => !prevState)

    return <div className='ActivityView'>
        <View>
            <Heading level='2'>Activity</Heading>
            <table className='ActivityTeacherTable' >
                <tbody>
                    <tr>
                        <th className='ActivityTeacherTitle'>
                            {editView
                                ? <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                                : <Heading level='3' className='ActivityText'>{activity.title}</Heading>}
                        </th>
                    </tr>
                    <tr>
                        <td>
                            {editView
                                ? <TextArea className='TextAreaActivity' value={description} onChange={(e) => setDescription(e.target.value)} />
                                : <Heading level='4' className='ActivityText'>{activity.description}</Heading>}
                        </td>
                    </tr>
                    {editView === false && (
                        <>
                            <tr>
                                <th>
                                    <Text>N° exercises</Text>
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <Heading level='3' className='ActivityText'>{exercisesCount}</Heading>
                                </td>
                            </tr>
                        </>
                    )}

                </tbody>
            </table>
        </View>

        {editView === false
            ? <>
                <div className='IconsContainer'>
                    <i
                        className="bi bi-pencil"
                        style={{ cursor: 'pointer', color: '#007bff' }}
                        onClick={handleEditButton}
                        title="Edit Activity"
                    ></i>
                    <i
                        className="bi bi-trash3"
                        style={{ cursor: 'pointer', color: '#ff0000' }}
                        onClick={toggleDeleteActivity}
                        title="Delete Activity"
                    ></i>
                </div>
                <View>
                    <Button><Link to={`/activities/${activityId}/exercises`}>List Exercises</Link></Button>
                    <Button><Link to='/activities/list'>Go Back</Link></Button>
                </View>
            </>
            : <View>
                <Button className='btn btn-secondary' onClick={handleEditButton}>Cancel Edit</Button>
                <Button className="btn btn-success" onClick={handleSaveChanges}>Save Changes</Button>
            </View>
        }
        {confirmDeleteActivity && <ConfirmDelete message="Delete activity?" onAccept={handleDeleteActivity} onCancel={toggleDeleteActivity} />}
    </div >
}

export default ViewActivityTeacher

