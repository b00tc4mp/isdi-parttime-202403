import React from 'react'
const CalendarDay = ({ day, className, hasTasks, isToday, isPastTask, handleShowTasks, currentDate }) => {

    return (
        <>
            {hasTasks ? (
                <button
                    onClick={handleShowTasks(new Date(currentDate))}
                    className={`${className} calendar-day calendar-day-with-tasks ${isToday ? 'calendar-day-today' : ''} ${isPastTask ? 'calendar-day-past-task' : ''}`}
                >
                    {day}
                </button>
            ) : (
                <div
                    className={`${className} calendar-day ${isToday ? 'calendar-day-today' : ''} ${isPastTask ? 'calendar-day-past-task' : ''}`}
                >
                    {day}
                </div>
            )}
        </>
    )
}

export default CalendarDay