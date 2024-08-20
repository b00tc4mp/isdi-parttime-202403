import { User } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const updateDataUser = (userId, updates) => {
    validate.id(userId, 'userId')

    if (updates.username) {
        validate.username(updates.username, 'username')
    }

    if (updates.email) {
        validate.email(updates.email, 'email')
    }

    if (updates.avatar) {
        validate.avatar(updates.avatar, 'avatar')
    }


    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            if (updates.username) {
                user.username = updates.username
            }

            if (updates.email) {
                user.email = updates.email
            }

            if (updates.avatar) {
                user.avatar = updates.avatar
            }

            return user.save()
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })

        })
}

export default updateDataUser
