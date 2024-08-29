import { User } from '../data/index.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

import { DuplicityError, SystemError } from 'com/errors.js'

const registerUser = (name, username, email, password) => {
    validate.name(name)
    validate.username(username)
    validate.email(email)
    validate.password(password)

    return User.findOne({ $or: [{ username }, { email }] })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user)
                throw new DuplicityError('User already exists')


            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {
                    const newUser = {
                        name,
                        username,
                        email,
                        password: hash
                    }

                    return User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default registerUser