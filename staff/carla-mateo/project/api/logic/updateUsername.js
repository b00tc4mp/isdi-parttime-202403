import { User } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const updateUsername = (userId, username) => {
    validate.id(userId, 'userId')
    validate.username(username, 'username')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }
            user.username = username
            return user.save()
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default updateUsername