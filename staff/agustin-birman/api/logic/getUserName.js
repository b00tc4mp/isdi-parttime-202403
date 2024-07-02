import validate from 'com/validate.js'
import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'



const getUserName = (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)


    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }
            data.users.findOne({ username: targetUsername })
                .then(targetUser => {
                    if (!targetUser) {
                        callback(new MatchError('targetUser not found'))

                        return
                    }
                    callback(null.targetUser.name)
                })
                .catch(error => callback(error => callback(new SystemError(error.message))))

        })
        .catch(error => callback(error => callback(new SystemError(error.message))))
}

export default getUserName