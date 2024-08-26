import { useEffect, useState } from 'react'

import logic from '../../../logic'

import View from '../../library/View'

import Button from '../../../components/core/Button'
import Field from '../../../components/core/Field'

function CreateTask({ onTaskSuccess, onCancelCreateTaskSuccess }) {
    const [users, setUsers] = useState([])

    const handleCreateTask = event => {
        event.preventDefault()

        const form = event.target
        const title = form.title.value
        const description = form.description.value
        const assigneeUserId = form.assigneeUserId.value || null
        const date = form.date.value ? form.date.value : null

        try {
            logic.createTask(assigneeUserId, title, description, date)
                .then(newTask => {
                    onTaskSuccess(newTask)
                })
                .catch((error) => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        try {
            logic.getAllUsers()
                .then(users => {
                    setUsers(users)
                })
                .catch((error) => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleCancelCreateTask = () => onCancelCreateTaskSuccess()

    return <View className='fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50'>
        <div className='fixed bottom-0 mb-20 left-1/2 transform border border-black -translate-x-1/2 bg-color-footer p-4 rounded-lg shadow-lg ' >
            <form className='flex flex-col gap-1 mb-4  ' onSubmit={handleCreateTask}>
                <Field id='title' type='text' placeholder='Task Title' />
                <textarea className='bg-green-100 border border-green-800 shadow-lg placeholder-black mb-2 mt-2' id='description' type='text' placeholder='Task Description ' />
                <Field id='date' type='date' placeholder='Task Date' />
                <select id='assigneeUserId' className='min-w-20 p-2  rounded  left-0 mt-2 w-48 bg-green-100 border border-green-800 shadow-lg'>
                    <option value=''>Unassigned</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                </select>
                <div className='flex flex-col justify-start mt-4 space-y-2'>
                    <Button type='submit'>Add Task</Button>
                    <Button onClick={handleCancelCreateTask} className='flex justify-between' type='button'>Cancel</Button>
                </div>
            </form>
        </div>
    </View>
}

export default CreateTask



