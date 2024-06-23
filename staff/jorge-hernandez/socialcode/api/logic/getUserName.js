import data from '../data/index.js'
import { MatchError } from 'com/errors.js'

const getUserName = (username, targetUsername, callback) => {
    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

        if (!user) {
            callback(new MatchError('user not found'))

            return
        }

        data.findUser(user => user.username === targetUsername, (error, targetUsername) => {
            if (error) {
                callback(error)

                return
            }

            if (!user) {
                callback(new MatchError('targetuser not found'))

                return
            }

            callback(null, targetUsername.name)
        })
    })
}

export default getUserName