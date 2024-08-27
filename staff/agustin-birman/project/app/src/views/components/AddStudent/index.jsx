import logic from '../../../logic'
import View from '../../../components/library/View'
import Heading from '../../../components/core/Heading'
import Text from '../../../components/core/Text'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../../../components/core/Button'
import './index.css'


function AddStudent() {
    const [userInfo, setUserInfo] = useState('')
    const { userInfoId } = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = () => {
        try {
            logic.getUserInfo(userInfoId)
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

    const handleAddStudent = () => {
        try {
            logic.addStudent(userInfoId)
                .then(() => navigate('/users/students'))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <>
        <Heading level='2' className='AddStudentTitle'>Student's Information</Heading>
        <div className='AddStudentContainer'>
            <Text className='AddStudentText'>Name: {userInfo.name}</Text>
            <Text className='AddStudentText'>Surname: {userInfo.surname}</Text>
            <Text className='AddStudentText'>Username: {userInfo.username}</Text>
        </div >
        <Button className='AddStudentButton' onClick={handleAddStudent}>Add Student</Button>
    </>
}

export default AddStudent