import React from 'react'

const CalendarDay = ({ day, hasTasks, isToday }) => {
    return (
        <div
            className={`calendar-day ${hasTasks ? 'calendar-day-with-tasks' : ''} ${isToday ? 'calendar-day-today' : ''}`}
        >
            {day}
        </div>
    )
}

export default CalendarDay