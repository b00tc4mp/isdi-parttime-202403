import { User, Appointment } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'


const deleteAppointment = (userId, appointmentId) => {
    validate.id(userId, 'userId')
    validate.id(appointmentId, 'appointmentId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Appointment.findById(appointmentId)
                .catch(error => { throw new SystemError(error.message) })
                .then(appointment => {
                    if (!appointment) throw new NotFoundError('Appointment not found')

                    return Appointment.updateOne({ _id: appointmentId }, { $set: { active: false } })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default deleteAppointment