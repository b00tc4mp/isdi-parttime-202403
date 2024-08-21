import './Calendar.css'

import CurrentMonthDay from './CurrentMonthDay'

const CurrentMonthDays = ({ days, today, onDayClick }) => {
    return <>
        {days.map(({ day, dateISO, className }) => {
            const isToday =
                today.getFullYear() === new Date(dateISO).getFullYear() &&
                today.getMonth() === new Date(dateISO).getMonth() &&
                day === today.getDate()

            return (
                <CurrentMonthDay
                    key={dateISO} // Usando la fecha ISO como clave única.
                    day={day}
                    dateISO={dateISO}
                    isToday={isToday}
                    className={isToday ? 'today' : className}
                    onDayClick={onDayClick} // Pasando la función de clic al componente hijo.
                />
            )
        })}
    </>
}

export default CurrentMonthDays
