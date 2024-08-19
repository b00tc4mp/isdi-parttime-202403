import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import { IoHome } from "react-icons/io5"

import CalendarBody from './CalendarBody'
import CalendarHeader from './CalendarHeader'
import UserProvider from '../UserProvider'

import Footer from '../Footer'
import Header from '../Header'

import Button from '../../../components/core/Button'
import Heading from '../../../components/core/Heading'
import Img from '../../../components/core/Img'

import './Calendar.css'
import View from '../../library/View'

import logic from '../../../logic'

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const navigate = useNavigate()
    const changeMonth = (delta) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + delta))
        setCurrentDate(newDate)
    }

    // const fetchTasks = () => {
    //     logic.getAllTasks()
    //         .then(fetchedTasks => setTasks(fetchedTasks))
    //         .catch(error => {
    //             console.error('Error fetching tasks:', error);
    //             alert('Failed to fetch tasks');
    //         })
    // }

    // useEffect(() => {
    //     fetchTasks();
    // }, [currentDate])

    const singHome = () => { navigate('/') }

    return (
        <UserProvider>
            {({ user }) => (
                <View>
                    <Header>
                        {user?.username && <Heading className="text-3xl mt-6 mr-10" level="1">{user.name}</Heading>}
                        <div>
                            {user?.avatar && <Img src={user.avatar} alt="user avatar" />}
                            {user?.name && <Heading className="text-xl" level="3"> {user.username}</Heading>}
                        </div>
                    </Header>

                    <div className="calendar">
                        <CalendarHeader currentDate={currentDate} changeMonth={changeMonth} />
                        <CalendarBody currentDate={currentDate} />
                    </div>
                    <Footer><Button onClick={singHome}>{<IoHome size={32} />}</Button></Footer>
                </View>
            )
            }
        </UserProvider >
    )
}

export default Calendar