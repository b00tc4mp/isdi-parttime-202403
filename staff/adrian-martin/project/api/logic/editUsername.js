import { User } from '../data/index.js'
import validate from '../../com/validate.js'
import { DuplicityError, NotFoundError, SystemError } from '../../com/errors.js'

const editUsername = (userId, username) => {
    validate.id(userId, 'userId')
    validate.username(username, 'username')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {

            if (!user) {
                throw new NotFoundError('User not found')
            }

            return User.findOne({ username }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(existUsername => {
            if (existUsername) {
                throw new DuplicityError('Username already exists')
            }

            return User.findByIdAndUpdate(userId, { username: username }, { new: true })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(updateUsername => {

            if (!updateUsername) {
                throw new SystemError('Failed to update username')
            }

            return updateUsername
        })
}

export default editUsername