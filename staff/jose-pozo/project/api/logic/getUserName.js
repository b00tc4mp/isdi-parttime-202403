import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getUserName = (userId, targetId) => {
    validate.id(userId, 'user id')
    validate.id(targetId, 'target id')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return User.findById(targetId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user)
                        throw new NotFoundError('targetUser not found')

                    return user.name
                })
        })
}

export default getUserName