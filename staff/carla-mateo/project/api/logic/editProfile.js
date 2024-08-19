import { User } from '../data/index.js'
import { DuplicityError, SystemError, NotFoundError } from 'com/errors.js'
import validate from 'com/validate.js'

const editProfile = (userId, username, email, avatar) => {
    validate.id(userId)
    validate.username(username)
    validate.email(email)
    validate.avatar(avatar)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return User.findOne({ $or: [{ email }, { username }] })
                .catch(error => { throw new SystemError(error.message) })
                .then(existingUser => {
                    if (existingUser && existingUser._id.toString() !== userId) {
                        throw new DuplicityError('email or username already in use')
                    }

                    const updateData = {
                        username,
                        email,
                        avatar,
                    }

                    return User.findByIdAndUpdate(userId, updateData, { new: true })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(updatedUser => {
                            return updatedUser
                        })
                })
        })
}

export default editProfile