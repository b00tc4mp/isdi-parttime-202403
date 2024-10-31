import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const updateAppointment = (appointmentId, appointmentUpdated) => {
    validate.id(appointmentId, 'appointmentId')

    if (appointmentUpdated.service) validate.id(appointmentUpdated.service)
    if (appointmentUpdated.date) validate.date(appointmentUpdated.date)
    if (appointmentUpdated.time) validate.time(appointmentUpdated.time)
    if (appointmentUpdated.status) validate.text(appointmentUpdated.status)

    return fetch(`${import.meta.env.VITE_API_URL}/appointments/${appointmentId}`, {
        method: 'PATCH',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,

            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ appointmentUpdated })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 200) return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default updateAppointment
