import { User } from '../data/index.js'
import { DuplicityError, SystemError, NotFoundError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

const registerUser = (userId, name, username, email, password) => {
    validate.id(userId)
    validate.name(name)
    validate.username(username)
    validate.email(email)
    validate.password(password)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('❌User not found')
            }

            return User.findOne({ $or: [{ email }, { name }] })
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (user) throw new DuplicityError('❌user already exists')

                    return bcrypt.hash(password, 8)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(hash => {

                            const newUser = {
                                name: name,
                                username: username,
                                email: email,
                                password: hash,
                                avatar: " ",
                                role: "user",
                                parent: userId
                            }

                            return User.create(newUser)
                                .catch(error => { throw new SystemError(error.message) })
                                .then(() => { })
                        })
                })
        })
}

export default registerUser