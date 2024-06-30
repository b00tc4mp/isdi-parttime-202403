import data from "../data/index.js"
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getUserName = (username, targetUsername, callback) => {
    validate.username(username)
    validate.targetUsername(targetUsername, 'targetUsername')
    validate.callback(callback)

    data.users.findOne({ username })
        //primero me busco (username)
        .then((user) => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }
            //busco otro usuario (targetUsername)
            data.users.findOne({ username: targetUsername })
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