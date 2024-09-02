import './currentAppointment.css'

import Text from '../../../components/core/Text'
import Box from '../../../components/core/Text'

import ViewBox from '../../../components/library/ViewBox'

function CurrentAppointment({ appointment }) {

    if (!appointment) {
        return (
            <ViewBox tag={'section'} className='CurrentAppointmentSection'>
                <Text className='CurrentAppointmentText'>Appointments</Text>
                <hr className='CurrentAppointmentHr'></hr>
                <Box className='mt-2'>
                    <Text className='CurrentAppointmentsDetails'>There are no appointments now</Text>
                </Box>
            </ViewBox>
        )
    }

    const startDateLocal = new Date(appointment.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const endDateLocal = new Date(appointment.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const dateFormatted = new Date(appointment.startDate).toLocaleDateString([], { day: '2-digit', month: '2-digit' })

    return <>
        <ViewBox tag={'section'} className='CurrentAppointmentSection'>
            <Text >Appointment</Text>
            <hr className='CurrentAppointmentHr'></hr>
            <Box className='mt-2'>
                <Text className='CurrentAppointmentsDetails'>Time: {startDateLocal} - {endDateLocal} hr.</Text>
                {/* <Text>Fecha: {dateFormatted}</Text> */}
                <Text className='CurrentAppointmentsDetails' >Service: {appointment?.service && appointment.service.name}</Text>
                <Text className='CurrentAppointmentsDetails'>Customer: {appointment.customer.name} {appointment.customer.surname}</Text>
                {/* <Text>Estado: {appointment.status}</Text> */}
                <Text className='CurrentAppointmentsDetails'>Notes:</Text>
            </Box>
        </ViewBox>
    </>
}

export default CurrentAppointment
