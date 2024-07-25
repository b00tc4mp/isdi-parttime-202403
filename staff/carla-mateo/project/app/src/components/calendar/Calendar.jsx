
import React, { useState } from 'react'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import './Calendar.css'

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date())

    const changeMonth = (delta) => {
        const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + delta))
        setCurrentDate(newDate)
    }

    return (
        <div className="calendar">
            <CalendarHeader currentDate={currentDate} changeMonth={changeMonth} />
            <CalendarBody currentDate={currentDate} />
        </div>
    )
}

export default Calendar