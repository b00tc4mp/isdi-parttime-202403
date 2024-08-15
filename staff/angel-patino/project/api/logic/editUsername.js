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
                throw new NotFoundError(error.message)
            }

            return User.findOne({ username }).lean()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(existUsername => {
            if (!existUsername) {
                return User.findByIdAndUpdate(userId, { username: username }, { new: true })
                    .catch(error => { throw new SystemError(error.message) })
            }
            else {
                throw new DuplicityError('username already exists')
            }
        })
}

export default editUsername