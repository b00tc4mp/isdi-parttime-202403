import validate from 'com/validate.js'
import { User } from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'



const getUserName = (userId, targetUserId, callback) => {
    validate.id(userId)
    validate.id(targetUserId, 'targetUserId')
    validate.callback(callback)


    User.findById(userId).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }
            User.findById(userId).lean()
                .then(user => {
                    if (!user) {
                        callback(new MatchError('targetUser not found'))

                        return
                    }
                    callback(null, user.name)
                })
                .catch(error => callback(error => callback(new SystemError(error.message))))

        })
        .catch(error => callback(error => callback(new SystemError(error.message))))
}

export default getUserName