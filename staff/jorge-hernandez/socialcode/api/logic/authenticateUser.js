import data from '../data/index.js'
import { MatchError, SystemError } from 'com/errors.js'
import bcrypt from 'bcryptjs'

// TODO 'separate regex to other file and change validation'
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{6,}$/
const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/


const authenticateUser = (username, password, callback) => {
    if (!USERNAME_REGEX.test(username)) {
        throw new ContentError('username no válido')
    }
    if (!PASSWORD_REGEX.test(password)) {
        throw new ContentError('password no válido')
    }

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