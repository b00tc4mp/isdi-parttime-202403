import { User } from '../data/index.js'
import validate from 'com/validate.js'
import { Types } from 'mongoose'

import { NotFoundError, SystemError } from 'com/errors.js'

const { ObjectId } = Types

const getUserName = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError("User not found")
            }
            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser) {
                        throw new NotFoundError("User not found")
                    }
                    return user
                })
        })
}

export default getUserName