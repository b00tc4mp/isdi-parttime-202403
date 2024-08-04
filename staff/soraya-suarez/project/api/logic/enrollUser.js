import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const enrollUser = (name, surname, email, role, manager, password, passwordRepeat) => {
    validate.name(name)
    validate.name(surname, 'surname')
    validate.email(email)
    validate.role(role)
    validate.id(manager)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    return User.findOne({ email })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user)
                throw new DuplicityError('user already exists')

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {

                    const newUser = {
                        name,
                        surname,
                        email,
                        phone: '',
                        avatar: '',
                        role,
                        manager,
                        available: true,
                        password: hash
                    }

                    return User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default enrollUser