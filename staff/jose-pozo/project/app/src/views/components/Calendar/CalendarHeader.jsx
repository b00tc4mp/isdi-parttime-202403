import './Calendar.css'

const CalendarHeader = ({ currentMonth, currentYear, onPrevMonth, onNextMonth, onTodayClick }) => {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    return <>
        <div className="CalendarHeader">
            <button onClick={onPrevMonth}>← prev</button>
            <div>
                <button onClick={onTodayClick}> Today </button>
                <span> {monthNames[currentMonth]} {currentYear} </span>
            </div>
            <button onClick={onNextMonth}>next →</button>
        </div>
    </>
}

export default CalendarHeader
