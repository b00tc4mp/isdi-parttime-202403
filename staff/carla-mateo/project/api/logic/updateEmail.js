import { User } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const updateEmail = (userId, email) => {
    validate.id(userId, 'userId')
    validate.email(email, 'email')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }
            user.email = email
            return user.save()
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default updateEmail
