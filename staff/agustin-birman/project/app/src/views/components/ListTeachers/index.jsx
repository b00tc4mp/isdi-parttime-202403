import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../useContext'
import './index.css'
import Button from '../../../components/core/Button'
import Heading from '../../../components/core/Heading'
import View from '../../../components/library/View'
import logic from '../../../logic'
import ConfirmDelete from '../../../components/library/ConfirmDelete'

function ListTeachers() {
    const [teachers, setTeachers] = useState([])
    const [confirmDeleteTeacher, setConfirmDeleteTeacher] = useState(false)
    const { alert } = useContext(Context)

    useEffect(() =>
        loadTeachers()
        , [])

    const loadTeachers = () => {
        try {
            logic.getTeachers()
                .then(teachers => {
                    setTeachers(teachers)
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

    const handleDeleteTeacher = (teacherId) => {
        try {
            logic.removeTeacher(teacherId)
                .then(() => loadTeachers())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const toggleDeleteTeacher = () => setConfirmDeleteTeacher(prevState => !prevState)

    return <View >
        <Heading level='2' className='TeachersListTitle'>Teachers List</Heading>
        <View >
            <table className='TeachersList'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher =>
                        <tr key={teacher.id}>

                            <td>{teacher.name}</td>
                            <td>{teacher.surname}</td>
                            <td>
                                <i
                                    className='bi bi-trash3'
                                    style={{ cursor: 'pointer', color: '#007bff' }}
                                    onClick={toggleDeleteTeacher}
                                    title='Delete Teacher'
                                ></i>
                                {confirmDeleteTeacher && <ConfirmDelete message='Do you want to delete this teacher?' onAccept={() => handleDeleteTeacher(teacher.id)} onCancel={toggleDeleteTeacher}></ConfirmDelete>}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </View >
        <Button><Link to='/'>Go Home</Link></Button>

    </View >
}

export default ListTeachers