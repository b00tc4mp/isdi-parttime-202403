import Button from '../../../components/core/Button'
import View from '../../../components/library/View'
import { Link } from 'react-router-dom'
import './index.css'
import logic from '../../../logic'
import extractPayloadFromJWT from '../../../utils/extractPayloadFromJWT'
import { useEffect, useState } from 'react'

function MenuItem() {
    const [userRole, setUserRole] = useState('')

    const { sub: userId } = extractPayloadFromJWT(localStorage.token) // TODO logic para getUserId

    useEffect(() => {
        getRole()
    }, [])

    const getRole = () => {
        try {
            const role = logic.getUserRole()
            setUserRole(role)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }
    return <View tag='main'>
        {userRole === 'student' && <>
            <Button className='MenuItem'><Link to={`/activities/${userId}/list`}>View activities</Link></Button>
            <Button className='MenuItem'><Link to='/users/teachers'>View teachers</Link></Button>
            <Button className='MenuItem btn btn-primary'><Link to={`/users/${userId}`} >Share ID</Link></Button>
            <Button className='MenuItem btn btn-primary'><Link to={`/users/student/${userId}/info`} >View Stats</Link></Button>
            <i className="bi bi-info-circle">asd</i>
        </>}

        {userRole === 'teacher' && <>
            <Button className='MenuItem'><Link to='/activities/select-type'>Create a activity</Link></Button>
            <Button className='MenuItem'><Link to='/activities/list'>View yours activities</Link></Button>
            <Button className='MenuItem' ><Link to='/users/students'>View students</Link></Button>
        </>}

    </View >
}

export default MenuItem