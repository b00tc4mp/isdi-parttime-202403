import { User } from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getUserName = (userId, targetUsername, callback) => {
    validate.id(userId, 'userId')
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            User.findById(targetUsername).lean()
                .then(user => {
                    if (!user) {
                        callback(new MatchError('targetUser not found'))

                        return
                    }

                    callback(null, user.name)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default getUserName