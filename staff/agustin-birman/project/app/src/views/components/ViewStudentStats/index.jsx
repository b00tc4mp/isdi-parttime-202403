import logic from '../../../logic'
import View from '../../../components/library/View'
import Heading from '../../../components/core/Heading'
import Text from '../../../components/core/Text'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../../../components/core/Button'
import './index.css'


function ViewStudentStats() {
    const [userInfo, setUserInfo] = useState('')
    const [userStats, setUserStats] = useState('')
    const [userRole, setUserRole] = useState('')
    const { userId } = useParams()

    useEffect(() => {
        getUserInfo()
        getUserStats()
        getRole()
    }, [])

    const getUserInfo = () => {
        try {
            logic.getUserInfo(userId)
                .then(user => setUserInfo(user))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const getUserStats = () => {
        try {
            logic.getUserStats(userId)
                .then(stats => setUserStats(stats))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const getRole = () => {
        try {
            const role = logic.getUserRole()
            setUserRole(role)
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        <Heading className='UserStatsTitle' level='2'>Student's Information</Heading>
        <div className='UserStatsContainer'>
            <Text className='UserStatsText'>Name: {userInfo.name}</Text>
            <Text className='UserStatsText'>Surname: {userInfo.surname}</Text>
            <Text className='UserStatsText'>Username: {userInfo.username}</Text>
            <Text className='UserStatsText'>N° Activities: {userStats.countActivities}</Text>
            <Text className='UserStatsText'>N° Exercises: {userStats.countExercises}</Text>
            <Text className='UserStatsText'>N° CorrectExercises: {userStats.countCorrectExercises}</Text>
        </div >

        {userRole === 'teacher' && <Button><Link to='/users/students'>Go Back</Link></Button>}
        {userRole === 'student' && <Button><Link to='/'>Go Back</Link></Button>}

    </>
}

export default ViewStudentStats