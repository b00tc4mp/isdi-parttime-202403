import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { IoCalendarNumber } from 'react-icons/io5'
import { IoHome } from 'react-icons/io5'
import { MdOutlineAddTask } from 'react-icons/md'

import CreateTask from './CreateTask'
import Task from './Task'

import UserProvider from '../UserProvider'
import Header from '../Header'
import Footer from '../Footer'

import Heading from '../../../components/core/Heading'
import Button from '../../../components/core/Button'

import Img from '../../../components/core/Img'

import View from '../../library/View'

import logic from '../../../logic/index'

function TasksList({ refreshStamp }) {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
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
    const handleDeleteTask = () => loadTasks()
    const handleCalendarClick = () => { navigate('/calendar') }
    const handleCancelCreateTaskSuccess = () => {
        setShowForm(false)
    }
    const handleCreateSuccess = () => {
        setShowForm(false)
        loadTasks()
    }

    const handleTaskDoneToggled = () => {
        loadTasks()
    }
    return (
        <UserProvider>
            {({ user }) => (
                < View >
                    <Header>
                        {user?.name && <Heading className='text-3xl mt-6 mr-10' level='1'>{user.name}</Heading>}
                        <div className='flex flex-col items-center justify-center'>
                            {user?.avatar && <Img src={user.avatar} alt='user avatar' />}
                            {user?.username && (
                                <Heading className='text-xl mt-2' level='3'>
                                    {user.username}
                                </Heading>
                            )}
                        </div>
                    </Header>
                    {showForm && <CreateTask onTaskSuccess={handleCreateSuccess} onCancelCreateTaskSuccess={handleCancelCreateTaskSuccess} />}
                    <button className='absolute top-[5rem] left-8 ' onClick={handleCreateTask} >{<MdOutlineAddTask size={32} />}</button>
                    <div className='flex flex-col  mb-[8rem] mt-[10rem] fixed top-0 bottom-0 overflow-y-auto'>
                        {tasks.map(task => (
                            task && <Task key={task.id}
                                task={task}
                                onTaskDeleted={handleDeleteTask}
                                onTaskDoneToggled={handleTaskDoneToggled}
                            />
                        ))}
                    </div>
                    <Footer>
                        <Button onClick={handleHomeClick}>{<IoHome size={32} />} </Button>
                        <Button onClick={handleCalendarClick}>{<IoCalendarNumber size={32} />}</Button>
                    </Footer>
                </View>
            )}
        </UserProvider >
    )
}

export default TasksList