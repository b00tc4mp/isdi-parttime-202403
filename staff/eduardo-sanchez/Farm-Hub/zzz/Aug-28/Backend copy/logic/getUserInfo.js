import { User } from '../data/index.js'

import { NotFoundError, SystemError } from 'com/errors.js'

import validate from 'com/validate.js'


const getUserInfo = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()

        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser) {
                        throw new NotFoundError('targetUser not found')
                    }

                    return targetUser

                })
        })
}

export default getUserInfo