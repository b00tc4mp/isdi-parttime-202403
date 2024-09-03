import './currentAppointment.css'

import { useEffect, useState } from 'react'

import logic from '../../../logic'

import Text from '../../../components/core/Text'
import Box from '../../../components/core/Text'

import ViewBox from '../../../components/library/ViewBox'
import Button from '../../../components/core/Button'

import Confirm from '../Confirm/Confirm'

function CurrentAppointment({ appointment, onCancelAppointment, onConfirmCancelAppointment }) {

    const [confirm, setConfirm] = useState(false)

    const handleConfirm = () => {
        setConfirm(!confirm)

        onConfirmCancelAppointment()
    }



    const handleCurrentAppointmentCancel = () => {

        try {
            logic.deleteAppointment(appointment.id)
                .then(() => {
                    setTimeout(() => {

                        onCancelAppointment()

                    }, 2000)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }


    if (!appointment) {
        return (
            <ViewBox tag={'section'} className='CurrentAppointmentSection'>
                <Text className='CurrentAppointmentText'>Appointments</Text>
                <hr className='CurrentAppointmentHr'></hr>
                <Box className='mt-4'>
                    <Text className='CurrentAppointmentsDetails'>There are no appointments now</Text>
                </Box>
            </ViewBox>
        )
    }

    const startDateLocal = new Date(appointment.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const endDateLocal = new Date(appointment.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const dateFormatted = new Date(appointment.startDate).toLocaleDateString([], { day: '2-digit', month: '2-digit' })


    return <>

        {confirm && <Confirm handleDeleteAppointment={handleCurrentAppointmentCancel} message={`Are you sure you want to cancel this appointment?`} onCancel={handleConfirm} />}

        <ViewBox tag={'section'} className='CurrentAppointmentSection'>
            <Text >Appointment</Text>
            <hr className='CurrentAppointmentHr'></hr>
            <Box className='mt-2'>
                <Box className='DetailsBoxes'>
                    <Text className='CurrentAppointmentDetails'>Time: {startDateLocal} - {endDateLocal} hr.</Text>
                    <Text className='CurrentAppointmentDetails'>Date: {dateFormatted}</Text>
                </Box>
                <Box className='DetailsBoxes'>
                    <Text className='CurrentAppointmentDetails' >Service: {appointment?.service && appointment.service.name}</Text>
                    <Text className='CurrentAppointmentDetails'>Customer: {appointment.customer.name} {appointment.customer.surname}</Text>
                </Box>
                <Box className='DetailsBoxesButton'>
                    {/* <Text className='CurrentAppointmentDetails'>Notes:</Text> */}
                    <Button onClick={handleConfirm} className='CurrentAppointmentCancelButton'>Cancel Appointment</Button>
                </Box>
            </Box>
        </ViewBox>
    </>
}

export default CurrentAppointment
