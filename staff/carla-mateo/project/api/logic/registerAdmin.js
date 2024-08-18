import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerAdmin = (name, username, email, password, passwordRepeat, avatar) => {
    validate.name(name)
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    //TODOO hacer validate avatar

    return User.findOne({ $or: [{ email }, { username }] })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError('user already exists')

            return bcrypt.hash(password, 8)
                .catch(error => { throw new SystemError(error.message) })
                .then(hash => {

                    const newUser = {
                        name: name,
                        username: username,
                        email: email,
                        password: hash,
                        avatar: avatar,
                        role: "admin",
                    }

                    return User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default registerAdmin