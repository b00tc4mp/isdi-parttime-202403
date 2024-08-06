import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerUser = (name, surname, email, phone, password, repeatPassword) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    // validate.phone(phone)
    validate.password(password)
    validate.passwordsMatch(password, repeatPassword)

    return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user)
                throw new DuplicityError('user already exists')

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {
                    const newUser = {
                        name: name,
                        surname: surname,
                        email: email,
                        phone: phone,
                        password: hash,
                        guest: [],
                        host: [],
                        room:[]
                    }

                    return User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default registerUser

