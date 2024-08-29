import { User } from '../data/models/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'


const registerUser = (name, surname, email, username, password, passwordRepeat) => {
    //Input validation
    validate.name(name)
    validate.surname(surname)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordMatch(password, passwordRepeat)

    return User.findOne({ $or: [{ email }, { username }] })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) {
                throw new DuplicityError('username already exists')

            }

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {
                    const newUser = {
                        name: name,
                        surname: surname,
                        email: email,
                        username: username,
                        password: hash,
                    }

                    User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })

                })
        })

}

export default registerUser

