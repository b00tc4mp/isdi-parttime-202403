import './Calendar.css'

const CurrentMonthDay = ({ day, className, dateISO, isToday, onDayClick }) => {
    const handleClick = () => {
        if (onDayClick) {
            onDayClick(dateISO) // Llama a la función pasada por el padre con la fecha en formato ISO.
        }
    }

    return <>
        <div
            id={dateISO}
            className={`CalendarDay ${className} ${isToday ? 'Today' : ''}`}
            onClick={handleClick}
        >
            {day}
        </div>
    </>
}

export default CurrentMonthDay
