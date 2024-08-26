import { User } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const updateAvatar = (userId, avatar) => {
    validate.id(userId, 'userId')
    validate.avatar(avatar, 'avatar')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }
            user.avatar = avatar
            return user.save()
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default updateAvatar