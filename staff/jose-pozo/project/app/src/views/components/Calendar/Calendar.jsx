import React, { useState } from 'react'

import './Calendar.css'

import CalendarHeader from './CalendarHeader'
import CalendarGrid from './CalendarGrid'

const Calendar = ({ setSelectedDate, onRefreshToday }) => {
    const today = new Date()
    const [currentMonth, setCurrentMonth] = useState(today.getMonth())
    const [currentYear, setCurrentYear] = useState(today.getFullYear())


    const handlePrevMonth = () => {
        setCurrentMonth((prevMonth) => {
            if (prevMonth === 0) {
                setCurrentYear((prevYear) => prevYear - 1)
                return 11
            }
            return prevMonth - 1
        })
    }

    const handleNextMonth = () => {
        setCurrentMonth((prevMonth) => {
            if (prevMonth === 11) {
                setCurrentYear((prevYear) => prevYear + 1)
                return 0
            }
            return prevMonth + 1
        })
    }

    const handleTodayClick = () => {
        setCurrentMonth(today.getMonth())
        setCurrentYear(today.getFullYear())
        onRefreshToday()
        const todayRefresh = today.toISOString().slice(0, 10)
        setSelectedDate(todayRefresh)
    }

    return (
        <div className="calendar">
            <CalendarHeader
                currentMonth={currentMonth}
                currentYear={currentYear}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onTodayClick={handleTodayClick}
            />
            <CalendarGrid
                currentMonth={currentMonth}
                currentYear={currentYear}
                today={today}
                onDayClick={setSelectedDate}
            />
        </div>
    )
}

export default Calendar
