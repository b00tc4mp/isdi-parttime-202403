import { useEffect, useState } from "react"

import logic from "../../logic"

import View from "../library/View"

import Button from "../../components/core/Button"
import Field from "../../components/core/Field"

function CreateTask() {

    const [tasks, setTasks] = useState([])
    const [users, setUsers] = useState([])

    const handleCreateTask = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value
        const description = form.description.value
        const assign = form.assign.value

        try {
            logic.createTask(title, description, assign)
                .then(newTask => {
                    setTasks(prevTasks => [...prevTasks, newTask])
                    onSuccess()
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
    }), []

    return <View>

        <div className='fixed bottom-0 mb-20 left-1/2 transform -translate-x-1/2 bg-color-footer p-4 rounded-lg shadow-lg' >
            <form className='mb-4' onSubmit={handleCreateTask}>

                <Field id="title" type="text" placeholder="Task Title" />
                <textarea className="bg-color-transparent" id="description" type="text" placeholder="Task Description" />
                <select className="bg-color-transparent" id="assign" type="id">
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
                <Button type="submit">Add Task</Button>
            </form>

        </div>

    </View>
}

export default CreateTask



