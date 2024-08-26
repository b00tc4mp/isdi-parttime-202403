import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './index.css'

import Button from '../../../components/core/Button'
import Heading from '../../../components/core/Heading'
import View from '../../../components/library/View'
import logic from '../../../logic'
import ConfirmDelete from '../../../components/library/ConfirmDelete'


function ListStudents() {
    const [students, setStudents] = useState([])
    const [confirmDeleteStudent, setConfirmDeleteStudent] = useState(false)
    const navigate = useNavigate()


    useEffect(() =>
        loadStudents()
        , [])

    const loadStudents = () => {
        try {
            logic.getStudents()
                .then(students => {
                    setStudents(students)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message) //TODO hacer un alert mejor
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleDeleteStudent = (studentId) => {
        try {
            logic.removeStudent(studentId)
                .then(() => loadStudents())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    const handleUserStats = (studentId) => navigate(`/users/student/${studentId}/info`)
    const toggleDeleteStudent = () => setConfirmDeleteStudent(prevState => !prevState)
    return <View>
        <Heading level='2' className='StudentsListTitle'>Students List</Heading>
        <View >
            <table className='StudentsList'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Info</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student =>
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.surname}</td>
                            <td><i
                                className="bi bi-info-circle"
                                onClick={() => handleUserStats(student.id)}
                                style={{ cursor: 'pointer', color: '#007bff' }}
                            ></i></td>
                            <td>
                                <i
                                    className="bi bi-trash3"
                                    style={{ cursor: 'pointer', color: '#ff0000' }}
                                    onClick={toggleDeleteStudent}
                                    title="Delete Teacher"
                                ></i>
                                {confirmDeleteStudent && <ConfirmDelete message='Do you want to delete this student?' onAccept={() => handleDeleteStudent(student.id)} onCancel={toggleDeleteStudent}></ConfirmDelete>}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </View>
        <Button><Link to='/'>Go Home</Link></Button>
    </View >
}

export default ListStudents