
import React from 'react'
import { GrNext } from "react-icons/gr"
import { GrPrevious } from "react-icons/gr"

const CalendarHeader = ({ currentDate, changeMonth }) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    return (
        <div className="calendar-header">
            <button onClick={() => changeMonth(-1)}><GrPrevious /></button>
            <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
            <button onClick={() => changeMonth(1)}><GrNext /></button>
        </div>
    )
}

export default CalendarHeader