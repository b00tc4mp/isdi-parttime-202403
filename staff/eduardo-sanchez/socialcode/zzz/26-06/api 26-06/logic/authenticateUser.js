
import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const authenticateUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    data.users.findOne({ username })
        .then(user => {
            if (!user) {
                callback(new MatchError('user not found'))

                return
            }

            bcrypt.compare(password, user.password, (error, match) => {
                if (error) {
                    callback(new SystemError(error.message))

                    return
                }

                if (!match) {
                    callback(new MatchError('wrong password'))

                    return
                }

                callback(null)
            })
        })
        .catch(error => callback(error))
}

export default authenticateUser
