import { User } from '../data/index.js'
import { MatchError } from 'com/errors.js'
import validate from 'com/validate.js'

const getUserName = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.username(targetUserId, 'targetUsername')

    return User.findById({ username }).lean()
        .catch(error => { throw new SystemError(error.message)})
        .then(user => {
            if (!user) {
                throw new MatchError('user not found')

                return
            }

            User.findById(targetUserId).lean()
                .then(user => {
                    if (!user) {
                        callback(new MatchError('targetUser not found'))

                        return
                    }

                    callback(null, user.name)
                })
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default getUserName
