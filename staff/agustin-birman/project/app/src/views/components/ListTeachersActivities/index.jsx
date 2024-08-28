import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'
import Heading from '../../../components/core/Heading'
import Button from '../../../components/core/Button'
import Input from '../../../components/core/Input'
import View from '../../../components/library/View'
import logic from '../../../logic'

function ListTeachersActivities() {
    const [activities, setActivities] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() =>
        loadActivities()
        , [])

    const loadActivities = () => {
        try {
            logic.getTeachersActivities()
                .then(activities => setActivities(activities))
                .catch(error => {
                    console.error(error)

                    alert(error.message) //TODO hacer un alert mejor
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const filteredActivities = activities.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.teacherUsername.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return <View>
        <Heading level='2' className='ActivitiesListTitle'>Activities List</Heading>
        <div className='SearchBar'>
            <Input
                type='text'
                placeholder='Search by title or teacher username'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
        </div>
        <div className='ActivitiesTeachersList'>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Teacher</th>
                        <th>Info</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map(activity => (
                            <tr key={activity.id}>
                                <td>{activity.title}</td>
                                <td>{activity.teacherUsername}</td>
                                <td>
                                    <Link to={`/activities/${activity.id}`}><i
                                        className='bi bi-info-circle'
                                        style={{ cursor: 'pointer', color: '#007bff' }}
                                    ></i></Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan='3'>No activities found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <Button><Link to='/'>Go Back</Link></Button>
    </View >
}

export default ListTeachersActivities