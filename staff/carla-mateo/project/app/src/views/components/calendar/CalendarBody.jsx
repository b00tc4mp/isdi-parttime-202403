import React from 'react'
import CalendarDay from './CalendarDay'
import './Calendar.css'

const CalendarBody = ({ currentDate }) => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const today = new Date()

    // Calculamos el primer día del mes y cuántos días tiene el mes actual
    const firstDayOfMonth = new Date(year, month, 0).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Calculamos cuántos días tiene el mes anterior
    const daysInPreviousMonth = new Date(year, month, 0).getDate()

    // Crear un array para los días del mes anterior
    const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, index) => (
        <CalendarDay
            key={`prev-${index}`}
            day={daysInPreviousMonth - firstDayOfMonth + index + 1}
            className="calendar-day-other-month"
        />
    ))

    // Crear un array para los días del mes actual
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
            />
        )
    })

    // Calculamos cuántos días del próximo mes se necesitan para completar la última semana
    const totalDays = firstDayOfMonth + daysInMonth
    const nextMonthDaysCount = (totalDays % 7 !== 0) ? (7 - (totalDays % 7)) : 0
    const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, index) => (
        <CalendarDay
            key={`next-${index}`}
            day={index + 1}
            className="calendar-day-other-month"
        />
    ))

    // Combinar los días del mes anterior, actual y siguiente en un solo array
    const days = [...prevMonthDays, ...monthDays, ...nextMonthDays]

    return (
        <div className="calendar-body">
            {days}
        </div>
    )
}

export default CalendarBody

