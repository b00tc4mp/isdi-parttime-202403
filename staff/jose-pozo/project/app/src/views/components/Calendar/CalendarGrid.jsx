import './Calendar.css'

import { useState } from 'react'

import PreviousMonthDays from './PreviousMonthDays'
import CurrentMonthDays from './CurrentMonthDays'
import NextMonthDays from './NextMonthDays'

const CalendarGrid = ({ currentMonth, currentYear, today, onDayClick }) => {

    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    firstDayOfMonth = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1 // Lunes = 0, domingo = 6 Para empezar en Lunes
    const totalDays = daysInMonth(currentMonth, currentYear)

    // Días del mes anterior
    const previousMonthDays = daysInMonth(currentMonth === 0 ? 11 : currentMonth - 1, currentYear)
    const daysFromPrevMonth = Array.from({ length: firstDayOfMonth }, (_, index) => {
        const day = previousMonthDays - firstDayOfMonth + index + 1
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear
        const dateISO = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

        return { day, dateISO, className: 'PrevMonthDay' }
    })

    // Días del mes actual
    const daysInCurrentMonth = Array.from({ length: totalDays }, (_, index) => {
        const day = index + 1
        const dateISO = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        return { day, dateISO, className: '' }
    })

    // Días del mes siguiente
    const nextDaysToShow = 42 - (daysFromPrevMonth.length + daysInCurrentMonth.length)
    const daysFromNextMonth = Array.from({ length: nextDaysToShow }, (_, index) => {
        const day = index + 1
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
        const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear
        const dateISO = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

        return { day, dateISO, className: 'NextMonthDay' }
    })

    const handleDayClick = (dateISO) => {
        // console.log(`Clicked on date: ${dateISO}`)
        // Aquí añadir la lógica para manejar el clic
        onDayClick(dateISO)
    }

    return (
        <div className="CalendarGrid">
            <PreviousMonthDays days={daysFromPrevMonth} onDayClick={handleDayClick} />
            <CurrentMonthDays days={daysInCurrentMonth} today={today} onDayClick={handleDayClick} />
            <NextMonthDays days={daysFromNextMonth} onDayClick={handleDayClick} />
        </div>
    )
}

export default CalendarGrid
