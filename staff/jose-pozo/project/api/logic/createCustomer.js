import { User } from '../data/index.js'
import { NotFoundError, SystemError, DuplicityError } from 'com/errors.js'
import validate from 'com/validate.js'

const createCustomer = (userId, name, surname, email) => {
    validate.id(userId, 'userId')
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found')
            }

            return User.findOne({ $and: [{ email }, { manager: user.id }, { role: 'customer' }, { password: '' }] })
                .catch(error => { throw new SystemError(error.message) })
                .then(customer => {
                    if (customer) {
                        throw new DuplicityError('Customer already exists')
                    }

                    const newCustomer = {
                        name,
                        surname,
                        email,
                        password: '',
                        role: 'customer',
                        phone: '',
                        manager: user.id,
                        providers: [],
                        appointments: [],
                        notes: [],
                        services: []
                    }

                    return User.create(newCustomer)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => newCustomer)
                })


        })

}







export default createCustomer
