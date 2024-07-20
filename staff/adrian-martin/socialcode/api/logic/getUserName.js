import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/error.js'
import validate from 'com/validate.js'


const getUserName = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found')
            }

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user) {
                        throw new NotFoundError('TargetUser not found')
                    }
                    return user.name
                })
        })
}

export default getUserName