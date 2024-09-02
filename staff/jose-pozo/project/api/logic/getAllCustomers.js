import { User } from '../data/index.js'
import { SystemError, NotFoundError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllCustomers = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')


            return User.find({ manager: userId, active: true }).select('-__v').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(customers => {

                    customers.forEach(customer => {

                        customer.id = customer._id.toString()

                        delete customer._id
                    })

                    return customers
                })

        })

}

export default getAllCustomers