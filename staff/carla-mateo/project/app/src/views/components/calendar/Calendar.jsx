import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import './Calendar.css'

import CalendarBody from './CalendarBody'
import CalendarHeader from './CalendarHeader'
import Header from '../header/Header'
import Button from '../../../components/core/button/Button'


const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const navigate = useNavigate()

    const changeMonth = (delta) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + delta))
        setCurrentDate(newDate);
    };

    const singHome = () => { navigate('/') };

    return (
        <>
            <Header>
                <Button onClick={singHome}>Home</Button>
            </Header>
            <div className="calendar">
                <CalendarHeader currentDate={currentDate} changeMonth={changeMonth} />
                <CalendarBody currentDate={currentDate} />
            </div>
        </>
    )
};

export default Calendar