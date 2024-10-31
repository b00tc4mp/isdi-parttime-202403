import { User, Service, Appointment } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const updateAppointment = (userId, appointmentId, appointmentUpdated) => {
    validate.id(userId, 'userId')
    validate.id(appointmentId, 'appointmentId')

    const fieldsUpdated = {}

    if (appointmentUpdated.service) {
        validate.id(appointmentUpdated.service, 'service')
        fieldsUpdated.service = appointmentUpdated.service
    }

    if (appointmentUpdated.date) {
        validate.date(appointmentUpdated.date)
        fieldsUpdated.date = appointmentUpdated.date
    }

    if (appointmentUpdated.time) {
        validate.time(appointmentUpdated.time)
        fieldsUpdated.time = appointmentUpdated.time
    }

    if (appointmentUpdated.status) {
        validate.text(appointmentUpdated.status, 'status')
        fieldsUpdated.status = appointmentUpdated.status
    }

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')
            console.log(appointmentUpdated)

            return Service.findById(appointmentUpdated.service)
                .catch(error => { throw new SystemError(error.message) })
                .then(service => {
                    if (!service) throw new NotFoundError('Service not found')

                    const startDateTime = new Date(`${appointmentUpdated.date}T${appointmentUpdated.time}`)
                    const duration = service.duration
                    const endDateTime = new Date(startDateTime.getTime() + duration * 60000)

                    return Appointment.find({
                        provider: user._id,
                        $and: [
                            { startDate: { $lt: endDateTime } },
                            { endDate: { $gt: startDateTime } }
                        ]
                    })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(appointments => {
                            if (appointments.length) throw new NotFoundError('Appointment not available')

                            return Appointment.updateOne({ _id: appointmentId }, { $set: fieldsUpdated })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => { })
                        })
                })
        })
}

export default updateAppointment




