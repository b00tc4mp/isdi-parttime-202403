import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createCustomer = (userId, name, surname, email) => {
    validate.id(userId, 'user id')
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)

    return User.findOne({ $or: [{ email }] })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user)
                throw new DuplicityError('User already exists')

            const newCustomer = {
                name,
                surname,
                email,
                password: '',
                role: 'customer',
                phone: '',
                customers: [],
                providers: [],
                appointments: [],
                notes: [],
                services: []
            }

            return User.create(newCustomer)
                .catch(error => { throw new SystemError(error.message) })
                .then(customerUser => {
                    return User.findById(userId)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(user => {
                            user.customers.push(customerUser._id);

                            return user.save()
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => customerUser)
                        })
                })
        })
}


export default createCustomer
