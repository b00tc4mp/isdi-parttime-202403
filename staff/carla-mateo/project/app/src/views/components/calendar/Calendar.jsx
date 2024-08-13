import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import CalendarBody from './CalendarBody'
import CalendarHeader from './CalendarHeader'
import Header from '../Header'
import Button from '../../../components/core/Button'
import Heading from '../../../components/core/Heading'

import { PiUsersThree } from "react-icons/pi"
import { IoHome } from "react-icons/io5"

import logic from '../../../logic'

import './Calendar.css'
import Footer from '../Footer'

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    const changeMonth = (delta) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + delta))
        setCurrentDate(newDate)
    }

    const singHome = () => { navigate('/') }

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
    }, [])

    return (
        <>
            <Header>
                {user?.username && <Heading className="text-2xl" level="1">{user.username}</Heading>}
                {user?.name && <Heading className="text-xl" level="3">{<PiUsersThree size={32} />} {user.name}</Heading>}
            </Header>

            <div className="calendar">
                <CalendarHeader currentDate={currentDate} changeMonth={changeMonth} />
                <CalendarBody currentDate={currentDate} />
            </div>

            <Footer><Button onClick={singHome}>{<IoHome size={32} />}</Button></Footer>
        </>
    )
};

export default Calendar