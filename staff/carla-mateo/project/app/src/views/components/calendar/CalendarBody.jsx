import React from 'react'
import CalendarDay from './CalendarDay'
import getDayWithTask from '../../../logic/getDayWithTask'

import './Calendar.css'

const CalendarBody = ({ currentDate, handleShowTasks }) => {

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const today = new Date()
    const firstDayOfMonth = new Date(year, month, 0).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPreviousMonth = new Date(year, month, 0).getDate()

    const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, index) => (
        <CalendarDay
            key={`prev-${index}`}
            day={daysInPreviousMonth - firstDayOfMonth + index + 1}
            className='calendar-day-other-month'
        />
    ))

    const checkDayWithTask = (selectedDate, setHasTask) => {
        getDayWithTask(selectedDate)
            .then((hasTask) => setHasTask(hasTask))
            .catch((error) => {
                throw new SystemError(error.message)
            })
    }

    const monthDays = Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1
        const isToday =
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate()

        return (
            <CalendarDay
                key={`current-${index}`}
                day={day}
                className='calendar-day'
                isToday={isToday}
                currentDate={new Date(year, month, day)}
                handleShowTasks={handleShowTasks}
            />
        )
    })

    const totalDays = firstDayOfMonth + daysInMonth
    const nextMonthDaysCount = (totalDays % 7 !== 0) ? (7 - (totalDays % 7)) : 0
    const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, index) => (
        <CalendarDay
            key={`next-${index}`}
            day={index + 1}
            className='calendar-day-other-month'
        />
    ))

    const days = [...prevMonthDays, ...monthDays, ...nextMonthDays]

    return (
        <div className='calendar-body'>
            {days}
        </div>
    )
}

export default CalendarBody

