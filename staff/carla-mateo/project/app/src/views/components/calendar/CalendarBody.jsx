import React from 'react'
import { useEffect, useState } from 'react'

import getDatesWithTask from '../../../logic/getDatesWithTask'

import CalendarDay from './CalendarDay'

import './Calendar.css'

const CalendarBody = ({ currentDate, handleShowTasks, selectedDate }) => {
    const [taskDates, setTaskDates] = useState(null)

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

    useEffect(() => {
        const selectedDate = new Date(currentDate)

        setTaskDates(null)

        getDatesWithTask(selectedDate)
            .then(_taskDates => {
                const formattedTaskDates = _taskDates.map(taskDate => {
                    return new Date(taskDate).toISOString().split('T')[0]
                })
                setTaskDates(formattedTaskDates)
            })

            .catch(error => console.error(error))

    }, [month])

    if (taskDates !== null) {
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
                    currentDate={new Date(year, month, day).toISOString().split('T')[0]}
                    handleShowTasks={handleShowTasks}
                    taskDates={taskDates}
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
}



export default CalendarBody

