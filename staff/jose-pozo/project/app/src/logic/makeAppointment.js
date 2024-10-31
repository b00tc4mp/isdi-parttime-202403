import errors, { SystemError } from 'com/errors'
import validate from 'com/validate'

const makeAppointment = (customerId, serviceId, date, time, status) => {
    validate.id(customerId, 'customerId')
    validate.id(serviceId, 'serviceId')
    validate.date(date)
    validate.time(time)
    validate.text(status, 'status')

    return fetch(`${import.meta.env.VITE_API_URL}/users/appointments`, {
        method: 'POST',

        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,

            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customerId,
            serviceId,
            date,
            time,
            status
        })
    })
        .catch(() => { throw new SystemError('server error') })
        .then(response => {
            if (response.status === 201) return

            return response.json()
                .catch(() => { throw new SystemError('server error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default makeAppointment
