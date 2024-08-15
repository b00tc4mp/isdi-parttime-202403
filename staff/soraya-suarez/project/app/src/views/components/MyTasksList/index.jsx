import { useState } from 'react'

import View from '../../../components/library/View'
import Task from '../Task'

import logic from '../../../logic'

import useContext from '../../../useContext'

import './index.css'

function MyTaskList() {
    const { alert } = useContext()

    

    const loadTasks = () => {
        console.log("llamada a load task")
        try {
            logic.getMyTasks()
                .then(tasks => {
                    console.log("llego", tasks)
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

    const [tasks, setTasks] = useState(()=>{
        loadTasks()
    })
    const handleTasksDeleted = () => loadTasks()

    return <View tag="section" className="TaskList">
        {tasks? tasks.map(task => <Task key={task.id} task={task} onTaskDeleted={handleTasksDeleted} />):"No se han encontrado tareas"}
    </View>
}

export default MyTaskList