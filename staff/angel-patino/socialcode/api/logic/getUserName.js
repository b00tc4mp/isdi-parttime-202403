import { User } from '../data/models/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getUserName = (userId, targetUserId, callback) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')
    validate.callback(callback)

    User.findById(userId).lean()
        //primero me busco (username)
        .then((user) => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }
            //busco otro usuario (targetUsername)
            User.findById(targetUserId).lean()
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