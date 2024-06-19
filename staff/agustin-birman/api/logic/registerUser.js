import validate from 'com/validate.js'
import data from '../data/index.js'
import { SystemError, DuplicityError } from 'com/errors.js'



const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passowrdsMatch(password, passwordRepeat)
    validate.callback(callback)

    data.findUser(user => user.email === email || user.username === username, (error, user) => {
        if (error) {
            callback(new SystemError(error.message))

            return
        }

        if (user) {
            callback(new DuplicityError('user already exists'))

            return
        }

        const newUser = {
            name,
            surname,
            email,
            username,
            password
        }

        data.insertUser(newUser, error => {
            if (error) {
                callback(new SystemError(error.message))

                return
            }

            callback(null, newUser)
        })
    })
}

export default registerUser