import './DailyStats.css'

import { useAppointmentsContext } from '../../../contexts/AppointmentsProvider'

import Box from '../../../components/core/Box'
import Text from '../../../components/core/Text'

import ViewBox from '../../../components/library/ViewBox'


function DailyStats({ selectedDate }) {
    const { appointments } = useAppointmentsContext()

    const todayDate = new Date().toISOString().slice(0, 10)

    const filteredAppointments = selectedDate
        ? appointments.filter(appointment => appointment.startDate.startsWith(selectedDate))
        : appointments.filter(appointment => appointment.startDate.startsWith(todayDate))

    const stats = {
        totalAppointments: filteredAppointments.length,
        services: filteredAppointments.reduce((acc, appointment) => {
            const serviceName = appointment.service.name

            !acc[serviceName] ? acc[serviceName] = 1 : acc[serviceName]++
            return acc
        }, {}),
        customers: filteredAppointments.reduce((acc, appointment) => {
            const customerName = `${appointment.customer.name} ${appointment.customer.surname}`
            !acc[customerName] ? acc[customerName] = 1 : acc[customerName]++
            return acc
        }, {}),
        status: filteredAppointments.reduce((acc, appointment) => {
            const status = appointment.status
            !acc[status] ? acc[status] = 1 : acc[status]++
            return acc
        }, {}),
    }

    const dateStats = selectedDate ? selectedDate : todayDate
    const dateStatsFormatted = new Date(dateStats).toLocaleDateString([], { day: '2-digit', month: '2-digit' })

    dateStats.slice(0, 10)

    return <>
        <ViewBox tag={'section'} className='DailyStatsSection'>
            <Box className='DailyStatsTitle'>
                <Text>Daily stats</Text>
                <Text>{dateStatsFormatted}</Text>
            </Box>
            <hr className='DailyStatsHr'></hr>
            <Box className='DailyStatsDetails'>
                <ul className='DailyStatsList'>
                    <li className='DailyStatsListLi'><p>Appointments:</p><p>{stats.totalAppointments}</p></li>
                    {Object.keys(stats.status).map(status => <li className='DailyStatsListLi' key={status}><p>{status}:</p><p>{stats.status[status]}</p></li>)}
                </ul>
                <ul className='DailyStatsList'>{Object.keys(stats.services).map(service => <li className='DailyStatsListLi' key={service}><p>{service}:</p><p>{stats.services[service]}</p> </li>)}</ul>
                <ul className='DailyStatsList'>{Object.keys(stats.customers).map(customer => <li className='DailyStatsListLi' key={customer}><p>{customer}:</p><p>{stats.customers[customer]}</p></li>)}</ul>
            </Box>





        </ViewBox >
    </>
}

export default DailyStats
