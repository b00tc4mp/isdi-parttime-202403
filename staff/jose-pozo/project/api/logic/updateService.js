debugger

import { User, Service } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const updateService = (userId, serviceId, serviceUpdated) => {
    validate.id(userId, 'userId')
    validate.id(serviceId, 'serviceId')

    const fieldsUpdated = {}

    if (serviceUpdated.name) {
        validate.text(serviceUpdated.name, 'name')
        fieldsUpdated.name = serviceUpdated.name
    }

    if (serviceUpdated.description) {
        validate.text(serviceUpdated.description, 'description')
        fieldsUpdated.description = serviceUpdated.description
    }

    if (serviceUpdated.category) {
        validate.text(serviceUpdated.category, 'category')
        fieldsUpdated.category = serviceUpdated.category
    }

    if (serviceUpdated.duration) {
        validate.number(serviceUpdated.duration, 'duration')
        fieldsUpdated.duration = serviceUpdated.duration
    }

    if (serviceUpdated.price) {
        validate.number(serviceUpdated.price, 'price')
        fieldsUpdated.price = serviceUpdated.price
    }

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Service.updateOne({ _id: serviceId }, { $set: fieldsUpdated })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
            return
        })
}

export default updateService