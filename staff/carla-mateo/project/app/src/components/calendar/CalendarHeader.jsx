
import React from 'react'

const CalendarHeader = ({ currentDate, changeMonth }) => {
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    return (
        <div className="calendar-header">
            <button onClick={() => changeMonth(-1)}>Previous</button>
            <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
            <button onClick={() => changeMonth(1)}>Next</button>
        </div>
    )
}

export default CalendarHeader