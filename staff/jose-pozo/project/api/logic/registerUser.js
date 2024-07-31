import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import bcrypt from 'bcrypt'
import validate from 'com/validate.js'

const registerUser = (username, email, password, passwordRepeat) => {
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return User.findOne({ $or: [{ username }, { email }] })
        .then(user => {
            if (user) {
                throw new DuplicityError('User already exists')
            }

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {
                    const newUser = {
                        username,
                        email,
                        password: hash,
                        name: '',
                        surname: '',
                        role: 'provider',
                        phone: ''
                    }

                    return User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })

        })
}

export default registerUser