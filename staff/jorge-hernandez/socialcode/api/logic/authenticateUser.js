import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import bcrypt from 'bcryptjs'
import validate from 'com/validate.js'

const authenticateUser = (username, password, callback) => {
    validate.username(username)
    validate.password(password)
    validate.callback(callback)

    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function')
    }

    data.findUser(user => user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }

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
}

export default authenticateUser