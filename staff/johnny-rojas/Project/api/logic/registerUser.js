import { DuplicityError, SystemError } from 'com/errors.js'
import { User } from '../data/index.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerUser = (name, surname, email, phone, password, passwordRepeat) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.phone(phone)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return User.findOne({ email }, { phone })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) {
                throw new DuplicityError('user already exists')
            }

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {
                    const newUser = {
                        name: name,
                        surname: surname,
                        email: email,
                        phone: phone,
                        password: hash,
                    }

                    return User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then((user) => user)
                })
        })
}

export default registerUser