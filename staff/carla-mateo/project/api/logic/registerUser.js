import { User } from '../data/idex.js'
import { DuplicityError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import bcrypt from 'bcryptjs'

import mongoose from 'mongoose'

const { ObjectId } = mongoose.Types

const registerUser = (userId, username, email, password) => {
    validate.id(userId)
    validate.username(username)
    validate.email(email)
    validate.password(password)

    return User.findById({ _id: new ObjectId(userId) })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new DuplicityError('❌user already exists')


            return User.findOne({ $or: [{ email }, { username }] })
                .catch(error => { throw new SystemError(error.message) })
                .then(user => {
                    if (user) throw new DuplicityError('❌user already exists')

                    return bcrypt.hash(password, 8)
                        .catch(error => { throw new SystemError(error.message) })
                        .then(hash => {

                            const newUser = {
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