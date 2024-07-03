import validate from 'com/validate.js'
import { User } from '../data/index.js'
import { SystemError, DuplicityError } from 'com/errors.js'
import bcrypt from 'bcryptjs'

const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passowrdsMatch(password, passwordRepeat)
    validate.callback(callback)

    User.findOne({ $or: [{ email }, { username }] })
        .then(user => {
            if (user) {
                callback(new DuplicityError('user already exists'))

                return
            }

            bcrypt.hash(password, 8, (error, hash) => {
                if (error) {
                    callback(new SystemError(error.message))

                    return
                }
                const newUser = {
                    name,
                    surname,
                    email,
                    username,
                    password: hash
                }

                User.create(newUser)
                    .then(() => callback(null))
                    .catch(error => callback(error))

            })
        })
        .catch(error => callback(error))
}

export default registerUser