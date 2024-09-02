import { useEffect, useState } from 'react'

import './Daily.css'

import logic from '../../../logic'

import Text from '../../../components/core/Text'
import Box from '../../../components/core/Text'

import ViewBox from '../../../components/library/ViewBox'


function Daily({ onRefreshAppointments, selectedDate, onSelectAppointment, setCurrentAppointment }) {

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        try {
            logic.getAllAppointments()
                .then(appointments => setAppointments(appointments))
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }, [onRefreshAppointments, selectedDate])


    const todayDate = new Date().toISOString().slice(0, 10)

    const filteredAppointments = selectedDate
        ? appointments.filter(appointment => appointment.startDate.startsWith(selectedDate))
        : appointments.filter(appointment => appointment.startDate.startsWith(todayDate))



    useEffect(() => {
        const now = new Date().getTime()
        const currentAppointment = appointments.find(appointment => {
            const startDate = new Date(appointment.startDate).getTime()
            const endDate = new Date(appointment.endDate).getTime()
            return startDate <= now && endDate >= now
        })

        if (currentAppointment && !selectedDate) {
            setCurrentAppointment(currentAppointment)
        }

    }, [appointments, setCurrentAppointment, selectedDate])


    return <>
        <ViewBox tag={'section'} className='DailySection'>

            <Box className='DailyTextBox'>
                <Text>Daily</Text>
                <Text>{selectedDate ? selectedDate.split('-').reverse().join('/') : todayDate.split('-').reverse().join('/')}</Text>
            </Box>

            <hr className='DailyHr'></hr>

            <ul className='DailyUl'>
                {filteredAppointments.slice().sort((a, b) => Date.parse(a.startDate) - Date.parse(b.startDate))
                    .map(appointment => {
                        //  const startDateLocal = new Date(appointment.startDate).toUTCString().slice(17, 22)             //.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        //const endDateLocal = new Date(appointment.endDate).toUTCString().slice(17, 22)                //.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        // const dateFormatted = `${new Date(appointment.startDate).toISOString().slice(8, 10)}/${new Date(appointment.startDate).toISOString().slice(5, 7)}`
                        // const dateFormatted = new Date(appointment.startDate).toISOString().slice(5, 10).join('/')

                        const startDateLocal = new Date(appointment.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        const endDateLocal = new Date(appointment.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        const dateFormatted = new Date(appointment.startDate).toLocaleDateString([], { day: '2-digit', month: '2-digit' })


                        const now = new Date().toUTCString()
                        const startDate = new Date(appointment.startDate).toUTCString()
                        const endDate = new Date(appointment.endDate).toUTCString()

                        const appointmentClassName =
                            endDate < now ? 'AppointmentPast' :
                                startDate <= now && endDate >= now ? 'AppointmentNow' :
                                    'AppointmentFuture'

                        let statusClassName = ''
                        appointment.status === 'confirmed' ? statusClassName = 'ConfirmedStatusBox' : appointment.status === 'pending' ? statusClassName = 'PendingStatusBox' : statusClassName = 'CancelledStatusBox'

                        return (
                            <li key={appointment.id} className={appointmentClassName} onClick={() => onSelectAppointment(appointment)}>
                                <Box className='DailyLiDateBox'>
                                    <Box className='DailyText'>{startDateLocal} - {endDateLocal} hr.</Box>
                                    <Box className='DateFormattedBox'>{dateFormatted} </Box>
                                </Box>
                                <Box className='DailyLiNameServiceBox'>
                                    <Box className='DailyText'>{appointment?.service && appointment.service.name}</Box>
                                    <Box className='DailyText'>{appointment.customer.name} {appointment.customer.surname}</Box>
                                    <Box className={statusClassName}>{appointment.status}</Box>
                                </Box>
                            </li>
                        )
                    })}
            </ul>

        </ViewBox>
    </>
}

export default Daily