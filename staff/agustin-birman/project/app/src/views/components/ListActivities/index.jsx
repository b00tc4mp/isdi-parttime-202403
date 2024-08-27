import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

import Heading from '../../../components/core/Heading'
import Button from '../../../components/core/Button'
import View from '../../../components/library/View'
import logic from '../../../logic'

function ListActivities() {
    const [activities, setActivities] = useState([])

    useEffect(() =>
        loadActivities()
        , [])

    const loadActivities = () => {
        try {
            logic.getActivities()
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

    return <View >
        <Heading level='2' className='ActitvitiesListTitle'>Activities List</Heading>
        <div className='ActivitiesListContainer'>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Info</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map(activity =>
                        <tr key={activity.id}>
                            <td>{activity.title}</td>
                            <td>
                                <Link to={`/activities/${activity.id}`}><i
                                    className="bi bi-info-circle"
                                    style={{ cursor: 'pointer', color: '#007bff' }}
                                ></i></Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <Button><Link to='/'>Go Back</Link></Button>
    </View >
}

export default ListActivities