import { useState } from 'react'

import View from '../../../components/library/View'
import Task from '../Task'

import logic from '../../../logic'

import useContext from '../../../useContext'

import './index.css'

function MyPrivateTaskList() {
    const { alert } = useContext()

    const [tasks, setTasks] = useState([])

    const loadTasks = () => {
        try {
            logic.getMyPrivateTasks()
                .then(tasks => {
                    setTasks(tasks)
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

    const handleTasksDeleted = () => loadTasks()

    return <View tag="section" className="TaskList">
        {tasks.map(task => <Task key={task.id} task={task} onTaskDeleted={handleTasksDeleted} />)}
    </View>
}

export default MyPrivateTaskList