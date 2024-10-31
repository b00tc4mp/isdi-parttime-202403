import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'


const updateCustomer = (userId, customerId, customerUpdated) => {
    validate.id(userId, 'userId')
    validate.id(customerId, 'customerId')

    const fieldsUpdated = {}

    if (customerUpdated.name) {
        validate.name(customerUpdated.name, 'name')
        fieldsUpdated.name = customerUpdated.name
    }

    if (customerUpdated.surname) {
        validate.name(customerUpdated.surname, 'surname')
        fieldsUpdated.surname = customerUpdated.surname
    }

    if (customerUpdated.email) {
        validate.email(customerUpdated.email, 'email')
        fieldsUpdated.email = customerUpdated.email
    }

    if (customerUpdated.phone) {
        validate.phone(customerUpdated.phone, 'phone')
        fieldsUpdated.phone = customerUpdated.phone
    }

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return User.updateOne({ _id: customerId }, { $set: fieldsUpdated })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default updateCustomer