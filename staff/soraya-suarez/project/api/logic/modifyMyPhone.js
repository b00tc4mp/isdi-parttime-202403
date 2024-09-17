import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const modifyMyPhone = (userId, phone) => {
    validate.id(userId)
    validate.phone(phone)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const update = { phone }

            return User.updateOne( { _id: user._id }, update)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default modifyMyPhone