import { User } from '../data/index.js'
import validate from 'com/validate.js'
import { SystemError, NotFoundError } from 'com/errors.js'

const getTargetProfile = (userId, targetProfile) => {
    validate.id(userId, 'userId')
    validate.id(targetProfile, 'targetProfile')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return User.findById(targetProfile).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetProfile => {
                    if (!targetProfile) throw new NotFoundError('Target profile not found')

                    return targetProfile
                })
        })
}

export default getTargetProfile