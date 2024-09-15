import { User, Service, Appointment } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'


const makeAppointment = (userId, customerId, serviceId, date, time, status) => {
    validate.id(userId, 'userId')
    validate.id(customerId, 'customerId')
    validate.id(serviceId, 'serviceId')
    validate.date(date)
    validate.time(time)



    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Service.findById(serviceId)
                .catch(error => { throw new SystemError(error.message) })
                .then(service => {
                    if (!service) throw new NotFoundError('Service not found')

                    const startDateTime = new Date(`${date}T${time}`)
                    const duration = service.duration
                    const endDateTime = new Date(startDateTime.getTime() + duration * 60000)

                    return Appointment.find({
                        active: true,
                        provider: user._id,
                        $and: [
                            { startDate: { $lt: endDateTime } },
                            { endDate: { $gt: startDateTime } }
                        ]
                    })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(appointments => {
                            if (appointments.length) throw new NotFoundError('Appointment not available')

                            const newAppointment = new Appointment({
                                customer: customerId,
                                service: serviceId,
                                provider: user._id,
                                startDate: startDateTime,
                                endDate: endDateTime,
                                status
                            })

                            return Appointment.create(newAppointment)
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => { })
                        })
                })
        })
}

export default makeAppointment