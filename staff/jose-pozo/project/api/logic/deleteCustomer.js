import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'


const deleteCustomer = (userId, targetUserId) => {

    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetId')

    return User.findById(userId).select('-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return User.updateOne({ _id: userId }, { $pull: { customers: targetUserId } })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => {

                    return User.findById(targetUserId).select('-__v').lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(targetUser => {
                            if (!targetUser) throw new NotFoundError('targetUser not found')

                            return User.deleteOne({ _id: targetUserId })
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => {

                                    return targetUserId._id
                                })
                        })
                })
        })
}

export default deleteCustomer