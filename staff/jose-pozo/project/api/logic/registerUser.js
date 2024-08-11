import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import bcrypt from 'bcryptjs'
import validate from 'com/validate.js'

const registerUser = (name, surname, email, password, passwordRepeat) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return User.findOne({ $or: [{ email }] })
        .then(user => {
            if (user) {
                throw new DuplicityError('User already exists')
            }

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {
                    const newUser = {
                        name,
                        surname,
                        email,
                        password: hash,
                        role: 'provider',
                        phone: '',
                        customers: [],
                        providers: [],
                        appointments: [],
                        notes: [],
                        services: []
                    }

                    return User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })

        })
}

export default registerUser