import { User } from '../data/models/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'


const registerUser = (name, surname, email, username, password, passwordRepeat, callback) => {
    //Input validation
    validate.name(name)
    validate.surname(surname)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)
    validate.callback(callback)

    User.findOne({ $or: [{ email }, { username }] })
        .then(user => {
            if (user) {
                callback(new DuplicityError('username already exists'))

                return
            }

            bcrypt.hash(password, 8, (error, hash) => {
                if (error) {
                    callback(new SystemError(error.message))

                    return
                }

                const newUser = {
                    name: name,
                    surname: surname,
                    email: email,
                    username: username,
                    password: hash,
                }

                User.create(newUser)
                    .then(result => callback(null))
                    .catch(error => callback(new SystemError(error.message)))
            })
        })
        .catch(error => callback(new SystemError(error.message)))


}



export default registerUser

