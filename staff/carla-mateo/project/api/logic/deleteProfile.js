import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const deleteProfile = (userId) => {
    validate.id(userId)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return User.findByIdAndDelete(userId)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default deleteProfile