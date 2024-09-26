import validate from 'com/validate.js'
import { User } from '../../data/index.js'
import { SystemError, DuplicityError } from 'com/errors.js'
import bcrypt from 'bcryptjs'

const registerUser = (name, surname, email, username, password, passwordRepeat, userType) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passowrdsMatch(password, passwordRepeat)
    validate.userType(userType)

    return User.findOne({ $or: [{ email }, { username }] })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) {
                throw new DuplicityError('user already exists')
            }

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {
                    const newUser = {
                        name,
                        surname,
                        email,
                        username,
                        password: hash,
                        userType,
                    }

                    return User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default registerUser