import { useEffect, useState } from 'react'
import logic from '../../../logic'
import './index.css'
import View from '../../../components/library/View'
import useContext from '../../../useContext'
import ViewActivityStudent from '../../../components/library/ViewActivityStudent'
import ViewActivityTeacher from '../../../components/library/ViewActivityTeacher'

function ViewActivity() {
    const [userRole, setUserRole] = useState('')

    const { alert } = useContext()

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

    return <View className='ActivityView'>
        {userRole === 'student' && <ViewActivityStudent />}
        {userRole === 'teacher' && <ViewActivityTeacher />}
    </View >
}

export default ViewActivity

