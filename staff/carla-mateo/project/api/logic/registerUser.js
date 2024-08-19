import { User } from '../data/index.js'
import { DuplicityError, SystemError, NotFoundError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

const registerUser = (userId, name, username, email, password, avatar, family) => {
    validate.id(userId)
    validate.name(name)
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.avatar(avatar)
    validate.text(family)


    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

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
                                role: "user",
                                family: family
                            }

                            return User.create(newUser)
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => { })
                        })
                })
        })
}

export default registerUser