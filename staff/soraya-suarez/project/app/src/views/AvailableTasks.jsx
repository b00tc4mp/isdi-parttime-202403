import { useEffect, useState } from 'react'

import Task from './components/Task'

import logic from '../logic'

import useContext from '../useContext'

function AvailableTasks() {
    const { alert } = useContext()

    const [tasks, setTasks] = useState([])

    useEffect(() => {
        loadTasks()
    })

    const loadTasks = () => {
        try {
            logic.getAvailableTasks()
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
        <h1 className='text-center text-xl'>Available tasks</h1>
        {tasks.map(task => <Task key={task.id} task={task} onTaskRefreshed={handleRefresh}/>)}
    </div>
}
export default AvailableTasks