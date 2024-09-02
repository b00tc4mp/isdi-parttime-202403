import { User, Appointment } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllAppointments = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Appointment.find({ provider: user._id, active: true }).populate('customer').populate('service').select('-__v').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(appointments => {

                    appointments.forEach(appointment => {

                        appointment.id = appointment._id.toString()

                        delete appointment._id
                    })

                    return appointments
                })
        })
}


export default getAllAppointments
