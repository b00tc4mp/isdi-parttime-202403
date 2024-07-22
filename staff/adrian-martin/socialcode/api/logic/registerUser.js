import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/error.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerUser = (name, surname, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return User.findOne({ $or: [{ email }, { username }] })
        .catch(() => { throw new SystemError("connection error") })
        .then(user => {
            if (user) {
                throw new DuplicityError('user already exists')
            }

            return bcrypt.hash(password, 8)
                .catch(() => { throw new SystemError("connection error") })
                .then(hash => {
                    const newUser = {
                        name: name,
                        surname: surname,
                        email: email,
                        username: username,
                        password: hash

                    }
                    return User.create(newUser)
                        .catch(() => { throw new SystemError("connection error") })
                        .then(() => { })
                })
        })

}

export default registerUser