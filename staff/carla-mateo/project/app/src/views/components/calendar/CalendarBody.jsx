import React from 'react'
import { useState, useEffect } from 'react'
import CalendarDay from './CalendarDay'
import taskDay from '../../../logic/taskDay'
import './Calendar.css'

const CalendarBody = ({ currentDate }) => {
    const [daysWithTasks, setDaysWithTasks] = useState([])
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const today = new Date()
    const firstDayOfMonth = new Date(year, month, 0).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPreviousMonth = new Date(year, month, 0).getDate()

    useEffect(() => {
        taskDay()
            .then(days => setDaysWithTasks(days))
            .catch((error) => alert(error.message))
    }, [])

    const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, index) => (
        <CalendarDay
            key={`prev-${index}`}
            day={daysInPreviousMonth - firstDayOfMonth + index + 1}
            className="calendar-day-other-month"
        />
    ))

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
                className="calendar-day"
                isToday={isToday}
                hasTasks={daysWithTasks.includes(day)}
            />
        )
    })

    const totalDays = firstDayOfMonth + daysInMonth
    const nextMonthDaysCount = (totalDays % 7 !== 0) ? (7 - (totalDays % 7)) : 0
    const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, index) => (
        <CalendarDay
            key={`next-${index}`}
            day={index + 1}
            className="calendar-day-other-month"
        />
    ))

    const days = [...prevMonthDays, ...monthDays, ...nextMonthDays]

    return (
        <div className="calendar-body">
            {days}
        </div>
    )
}

export default CalendarBody

