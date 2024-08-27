import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IoHome } from 'react-icons/io5'
import { FaTasks } from 'react-icons/fa'
import { IoMdCloseCircleOutline } from 'react-icons/io'

import CalendarBody from './CalendarBody'
import CalendarHeader from './CalendarHeader'
import UserProvider from '../UserProvider'

import Footer from '../Footer'
import Header from '../Header'

import logic from '../../../logic'
import Button from '../../../components/core/Button'
import Heading from '../../../components/core/Heading'
import Img from '../../../components/core/Img'

import View from '../../library/View'

import './Calendar.css'

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDayTasks, setSelectedDayTasks] = useState([])
    const [selectedDay, setSelectedDay] = useState(null)
    const [showTask, setShowTask] = useState(false)
    const navigate = useNavigate()

    const changeMonth = (delta) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + delta))
        setCurrentDate(newDate)
    }

    const handleShowTasks = (dayDate) => () => {
        logic.getTasksForDate(dayDate)
            .then(tasks => {
                setSelectedDay(dayDate.toDateString())
                setSelectedDayTasks(tasks)
                setShowTask(true)
            })
            .catch((error) => console.error(error))

    }
    const singHome = () => { navigate('/') }
    const handleTaskClick = () => { navigate('/taskslist') }
    const handleCloseTasks = () => { setShowTask(false) }

    return (
        <UserProvider>
            {({ user }) => (
                <View>
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
                    <div className='calendar'>
                        <CalendarHeader currentDate={currentDate} changeMonth={changeMonth} />
                        <CalendarBody currentDate={currentDate} handleShowTasks={handleShowTasks} />
                        <div className='tasks-container'>
                            {selectedDay && showTask && (
                                <div>
                                    <div className='flex justify-between text-xl m-2  bg-green-200 bg-opacity-80 rounded-lg p-1 shadow'>
                                        <div className='mt-3 ml-6 flex flex-col'>
                                            <Heading className='mb-2' level='2'>{selectedDay}</Heading>
                                            <Heading className='mb-2' level='2'>Tasks:</Heading>
                                        </div>
                                        <button className='mb-8 mr-3' onClick={handleCloseTasks} >{<IoMdCloseCircleOutline size={26} />}</button>
                                    </div>
                                    <ul>
                                        {selectedDayTasks.map(task => (
                                            <li key={task.id} className='m-2'>
                                                <div className='bg-green-200 bg-opacity-80 rounded-lg p-1 shadow '>
                                                    <h3 className='text-lg font-bold mb-2 ml-6 '>{task.title}</h3>
                                                    <p className='text-sm text-gray-600 ml-6 mb-2'>{task.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <Footer>
                        <Button onClick={singHome}>{<IoHome size={32} />}</Button>
                        <Button onClick={handleTaskClick}>{<FaTasks size={32} />}</Button>
                    </Footer>
                </View>
            )}
        </UserProvider >
    )
}

export default Calendar