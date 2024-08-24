import React from 'react'
import { useState, useEffect } from 'react'
import CalendarDay from './CalendarDay'
import taskDay from '../../../logic/taskDay'
import './Calendar.css'
const CalendarBody = ({ currentDate, handleShowTasks }) => {
    const [daysWithTasks, setDaysWithTasks] = useState([])
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const today = new Date()
    const firstDayOfMonth = new Date(year, month, 0).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPreviousMonth = new Date(year, month, 0).getDate()

    useEffect(() => {
        taskDay(new Date(`${year}-${month + 1}-01`))
            .then(days => setDaysWithTasks(days))
            .catch((error) => alert(error.message))
    }, [month])

    const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, index) => (
        <CalendarDay
            key={`prev-${index}`}
            day={daysInPreviousMonth - firstDayOfMonth + index + 1}
            className='calendar-day-other-month'
        />
    ))

    const monthDays = Array.from({ length: daysInMonth }, (_, index) => {
        const day = index + 1
        const isToday =
            year === today.getFullYear() &&
            month === today.getMonth() &&
            day === today.getDate()
        const isPast = new Date(year, month, day) < today && !isToday
        const hasTasks = daysWithTasks.includes(day) && !isPast
        const isPastTask = daysWithTasks.includes(day) && isPast

        return (
            <CalendarDay
                key={`current-${index}`}
                day={day}
                className='calendar-day'
                isToday={isToday}
                isPastTask={isPastTask}
                hasTasks={hasTasks}
                currentDate={`${year}-${month + 1}-${day}`}
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

