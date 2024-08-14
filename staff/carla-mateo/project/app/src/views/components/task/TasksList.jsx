import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'

import { PiUsersThree } from "react-icons/pi"
import { IoHome } from "react-icons/io5"
import { MdOutlineAddTask } from "react-icons/md";

import Header from "../Header"
import Footer from "../Footer"

import Heading from "../../../components/core/Heading"
import Button from "../../../components/core/Button"

import View from "../../library/View"

import logic from '../../../logic/index'
import CreateTask from "./CreateTask";
import Task from "./Task";

function TasksList({ refreshStamp }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        try {
            logic.getUserName()
                .then(user => {
                    setUser(user)
                })
                .catch((error) => alert(error.message))
        } catch (error) {
            alert(error.message)
        }

        loadTasks()
    }, [refreshStamp])

    const loadTasks = () => {
        try {
            logic.getAllTasks()
                .then((tasks) => setTasks(tasks))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleHomeClick = () => { navigate('/') }
    const handleCreateTask = () => { setShowForm(!showForm) }
    const handleCreateSuccess = (newTask) => {
        setTasks(prevTasks => [...prevTasks, newTask])
        setShowForm(false)
    }
    const handleDeleteTask = () => loadTasks()

    return <View>
        <Header>
            {user?.username && <Heading className="text-2xl" level="1">{user.username}</Heading>}
            {user?.name && <Heading className="text-xl" level="3">{<PiUsersThree size={32} />} {user.name}</Heading>}
        </Header>

        {showForm && <CreateTask onTaskSuccess={handleCreateSuccess} />}

        <Button onClick={handleCreateTask} >{<MdOutlineAddTask size={32} />}</Button>

        <View>
            {tasks.map(task => (
                <Task key={task.id}
                    task={task}
                    onTaskDeleted={handleDeleteTask} />
            ))}
        </View>


        <Footer><Button onClick={handleHomeClick}>{<IoHome size={32} />}</Button></Footer>

    </View>
}

export default TasksList