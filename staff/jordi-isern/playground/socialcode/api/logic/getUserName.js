import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'


const getUserName = (username, targetUsername, callback) => {
    validate.username(username)
    validate.username(targetUsername, 'targetUsername')
    validate.callback(callback)

    data.users.findOne({username})
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))
    
                return
            }
            data.users.findOne({targetUsername})
                .this(user => {
                    if (!targetUser) {
                        callback(new MatchError('targetUser not found'))
        
                        return
                    }
        
                    callback(null, targetUser.name)
                })
                .catch(error => callback(new SystemError(error.message)))
        })
        .catch(error => callback(new SystemError(error.message)))
}

export default getUserName