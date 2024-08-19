import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'


const deleteCustomer = (userId, customerId) => {

    validate.id(userId, 'userId')
    validate.id(customerId, 'Customer')

    return User.findById(userId).select('-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            // return User.updateOne({ _id: userId }, { $pull: { customers: Customer } })
            //     .catch(error => { throw new SystemError(error.message) })
            //     .then(() => {

            return User.findById(customerId).select('-__v').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(customerId => {
                    if (!customerId) throw new NotFoundError('Customer not found')

                    return User.deleteOne({ _id: customerId })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => {

                            return customerId._id
                        })
                })
            // })
        })
}

export default deleteCustomer