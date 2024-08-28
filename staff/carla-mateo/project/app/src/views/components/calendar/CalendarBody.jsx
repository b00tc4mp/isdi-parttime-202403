import React from 'react'
import { useEffect, useState } from 'react'

import getDatesWithTask from '../../../logic/getDatesWithTask'

import CalendarDay from './CalendarDay'


import './Calendar.css'

const CalendarBody = ({ currentDate, handleShowTasks, selectedDate }) => {
    const [taskDates, setTaskDates] = useState([])
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const today = new Date()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPreviousMonth = new Date(year, month, 0).getDate()

    const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, index) => (
        <CalendarDay
            key={`prev-${index}`}
            day={daysInPreviousMonth - firstDayOfMonth + index + 1}
            className='calendar-day-other-month'
        />
    ))

    useEffect(() => {
        const selectedDate = `${year}-${month}-01`

        getDatesWithTask(selectedDate)
            .then(dates => setTaskDates(dates))
            .catch(error => console.error(error))
    }, [selectedDate])

    const monthDays = Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 2
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
                hasTasks={taskDates.includes(new Date(year, month, day))}
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

