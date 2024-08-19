import { useEffect, useState } from "react"

import logic from "../../../logic"

import View from "../../library/View"

import Button from "../../../components/core/Button"
import Field from "../../../components/core/Field"

function CreateTask({ onTaskSuccess }) {
    const [users, setUsers] = useState([])

    const handleCreateTask = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const description = form.description.value
        const assignee = form.assignee.value || null
        const family = form.family.value
        const date = form.date.value || null

        try {
            logic.createTask(family, assignee, title, description, date)
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

    return <View>
        <div className='fixed bottom-0 mb-20 left-1/2 transform -translate-x-1/2 bg-color-footer p-4 rounded-lg shadow-lg ' >
            <form className='mb-4 ' onSubmit={handleCreateTask}>
                <Field id="family" type="text" placeholder="Family" />
                <Field id="title" type="text" placeholder="Task Title" />
                <textarea className="bg-green-100 border border-green-800 shadow-lg" id="description" type="text" placeholder="Task Description" />
                <Field id="date" type="date" placeholder="Task Date" />

                <select id="assignee" className="min-w-20 p-2  rounded  left-0 mt-2 w-48 bg-green-100 border border-green-800 shadow-lg">
                    <option value="">Unassigned</option>
                    {users.map(user => (
                        <option key={user.id} value={user.username}>{user.username}</option>
                    ))}
                </select>
                <Button type="submit">Add Task</Button>
            </form>
        </div>
    </View>
}

export default CreateTask



