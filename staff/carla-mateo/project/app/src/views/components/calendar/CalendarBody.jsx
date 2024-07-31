import React from 'react'
import CalendarDay from './CalendarDay'
import './Calendar.css'

const CalendarBody = ({ currentDate }) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(<CalendarDay key={i} day={i} />)
    }



    return (
        <div className="calendar-body">
            {days}
        </div>
    )
}

export default CalendarBody