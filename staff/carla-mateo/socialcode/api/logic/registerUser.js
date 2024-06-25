import data from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)
    validate.callback(callback)


    data.findUser(user => user.email === email || user.username === username, (error, user) => {
        if (error) {
            callback(error)

            return
        }
        if (user) {
            callback(new DuplicityError('❌ User already exist'))

            return

        }

        bcrypt.hash(password, 4, (error, hash) => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }
            const newUser = {

                name: name,
                surname: surname,
                email: email,
                username: username,
                password: hash
            }

            data.insertUser(newUser, error => {
                if (error) {
                    callback(error)

                    return
                }

                callback(null)

            })
        })
    })
}

export default registerUser