import React from 'react'

const CalendarDay = ({ day, className }) => {
    return (
        <div className={className}>
            {day}
        </div>
    )
}

export default CalendarDay