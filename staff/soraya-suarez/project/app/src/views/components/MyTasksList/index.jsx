import { useState, useEffect } from 'react'

import View from '../../../components/library/View'
import Task from '../Task'

import logic from '../../../logic'

import useContext from '../../../useContext'

function MyTaskList() {
    const { alert } = useContext()

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        loadTasks()
    })

    const loadTasks = () => {
        try {
            logic.getMyTasks()
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
    
    const handleTaskDeleted = () => loadTasks()

    return <div tag="section" className="overflow-scroll my-4">
        {tasks.map(task => <Task key={task.id} task={task} onTaskDeleted={handleTaskDeleted}/>)}
    </div>
}

export default MyTaskList