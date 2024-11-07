import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const getAllUsers = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return User.find({ }).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(users => {
                    users.forEach((user) => {
                        user.id = user._id.toString()
                        delete user._id
                    })
                    return users
                })
        })
}

export default getAllUsers