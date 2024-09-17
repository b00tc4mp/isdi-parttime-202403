import { useState, useEffect } from 'react'

import Task from '../Task'

import logic from '../../../logic'

import useContext from '../../../useContext'

function MyFinishedTaskList() {
    const { alert } = useContext()

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        loadTasks()
    })

    const loadTasks = () => {
        try {
            logic.getMyFinishedTasks()
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

    const handleRefresh = () => loadTasks()

    return <div tag='section'>
        {tasks.map(task => <Task key={task.id} task={task} onTaskRefreshed={handleRefresh}/>)}
    </div>
}

export default MyFinishedTaskList