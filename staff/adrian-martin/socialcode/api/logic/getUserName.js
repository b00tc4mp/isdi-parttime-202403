import data from '../data/index.js'
import { MatchError } from 'com/error.js'
import validate from 'com/validate.js'


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
                .then(user => {
                    if (!user) {
                        callback(new MatchError('targetUsername not found'))

                        return
                    }
                    callback(null, user.name)

                })
                .catch(error => callback(error))
        })
        .catch(error => callback(error))

    // data.findUser(user => user.username === username, (error, user) => {
    //     if (error) {
    //         callback(error)

    //         return
    //     }

    //     if (!user) {
    //         callback(new MatchError('user not found'))

    //         return
    //     }

    //     data.findUser(user => user.username === targetUsername, (error, targetUsername) => {
    //         if (error) {
    //             callback(error)

    //             return
    //         }

    //         if (!targetUsername) {
    //             callback(new MatchError('targetUsername not found'))

    //             return
    //         }

    //         callback(null, targetUsername.name)
    //     })
    // })
}

export default getUserName