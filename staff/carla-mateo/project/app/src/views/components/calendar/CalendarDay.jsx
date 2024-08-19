import React from 'react'

const CalendarDay = ({ day, className, isToday }) => {
    return (
        <div className={`${className} ${isToday ? 'calendar-day-today' : ''}`}>
            {day}
        </div>
    )
}

export default CalendarDay