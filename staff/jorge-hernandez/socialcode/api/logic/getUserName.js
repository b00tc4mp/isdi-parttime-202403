import { User } from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getUserName = (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    User.findOne({ username }).lean()
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            User.findOne({ username: targetUsername }).lean()
                .then(user => {
                    if (!user) {
                        callback(new MatchError('targetuser not found'))

                        return
                    }

                    callback(null, user.name)

                    return
                })

                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default getUserName