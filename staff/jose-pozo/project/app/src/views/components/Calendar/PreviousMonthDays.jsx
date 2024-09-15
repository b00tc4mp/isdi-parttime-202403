import './Calendar.css'

import CurrentMonthDay from './CurrentMonthDay'

const PreviousMonthDays = ({ days, onDayClick }) => {
    return <>
        {days.map(({ day, dateISO, className }) => (
            <CurrentMonthDay
                key={dateISO}
                day={day}
                dateISO={dateISO}
                className={className}
                onDayClick={() => { }}
            />
        ))}
    </>
}

export default PreviousMonthDays
