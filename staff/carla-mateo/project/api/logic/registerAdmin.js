import { User } from '../data/index.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerAdmin = (name, username, email, password, passwordRepeat, avatar, family) => {
    validate.name(name)
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)
    validate.avatar(avatar)
    validate.text(family)


    return User.findOne({ $or: [{ email }, { username }] })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (user) throw new DuplicityError('admin already exists')

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
                        family: family
                    }

                    return User.create(newUser)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default registerAdmin