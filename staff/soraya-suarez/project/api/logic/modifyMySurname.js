import { User } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const modifyMySurname = (userId, surname) => {
    validate.id(userId)
    validate.name(surname, 'surname')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const update = { surname }

            return User.updateOne( { _id: user._id }, update)
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default modifyMySurname