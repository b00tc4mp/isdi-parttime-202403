import { User } from '../data/index.js'
import { SystemError, NotFoundError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllCustomers = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).populate('customers', '-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return user.customers.map(customer => {
                customer.id = customer._id.toString()

                delete customer._id

                return customer
            })
        })
}



export default getAllCustomers