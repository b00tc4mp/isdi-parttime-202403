import { User } from '../data/index.js'
import { Service } from '../data/index.js'
import { NotFoundError, SystemError, DuplicityError } from 'com/errors.js'
import validate from 'com/validate.js'

const addService = (userId, name, description, category, duration, price) => {
    validate.id(userId, 'userId')
    validate.text(name, 'name')
    validate.number(duration, 'duration')
    validate.number(price, 'price')

    if (description) { validate.text(description, 'description') }
    if (category) { validate.text(category, 'category') }


    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found')
            }

            return Service.findOne({ name, provider: user.id })
                .catch(error => { throw new SystemError(error.message) })
                .then(service => {
                    if (service) {
                        throw new DuplicityError('Service already exists')
                    }

                    const newService = {
                        name,
                        description,
                        category,
                        duration,
                        price,
                        provider: user.id
                    }

                    return Service.create(newService)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })


        })
}

export default addService