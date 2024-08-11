import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getUserProfile = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).select('-__v').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return User.findById(targetUserId).select('-__v').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser) throw new NotFoundError('targetUser not found')

                    targetUser.id = targetUser._id.toString()

                    delete targetUser._id

                    return targetUser
                })



        })
}

export default getUserProfile