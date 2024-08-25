import { User, Service } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'


const deleteService = (userId, serviceId) => {
    validate.id(userId, 'userId')
    validate.id(serviceId, 'serviceId')

    return User.findById(userId).select('-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Service.findById(serviceId).select('-__v').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(service => {
                    if (!service) throw new NotFoundError('Service not found')

                    return Service.deleteOne({ _id: serviceId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => {

                            return service._id
                        })
                })
        })
}

export default deleteService