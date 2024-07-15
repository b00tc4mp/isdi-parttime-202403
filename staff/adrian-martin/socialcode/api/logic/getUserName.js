import { User } from '../data/index.js'
import { MatchError, NotFoundError } from 'com/error.js'
import validate from 'com/validate.js'


const getUserName = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new MatchError('user not found')
            }

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (!user) {
                        throw new NotFoundError('targetUsername not found')
                    }
                    return user.name
                })
        })
}

export default getUserName