import './Calendar.css'

import Button from '../../../components/core/Button'
import Box from '../../../components/core/Box'

const CalendarHeader = ({ currentMonth, currentYear, onPrevMonth, onNextMonth, onTodayClick }) => {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    return <>
        <Box className="CalendarHeader">
            <Button onClick={onPrevMonth}>← prev</Button>
            <Button onClick={onTodayClick}> 🔄 Today </Button>
            <span> {monthNames[currentMonth]} {currentYear} </span>
            <Button onClick={onNextMonth}>next →</Button>
        </Box>
    </>
}

export default CalendarHeader
