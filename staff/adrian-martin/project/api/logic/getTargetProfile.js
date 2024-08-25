import { User } from '../data/index.js'
import validate from 'com/validate.js'
import { SystemError, NotFoundError } from 'com/errors.js'

const getTargetProfile = (userId, targetProfileId) => {
    validate.id(userId, 'userId')
    validate.id(targetProfileId, 'targetProfile')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return User.findById(targetProfileId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetProfile => {
                    if (!targetProfile) throw new NotFoundError('Target profile not found')

                    if (targetProfile._id.toString() !== userId.toString()) {
                        throw new NotFoundError('Target profile not found')
                    }

                    targetProfile.id = targetProfile._id.toString()
                    delete targetProfile._id

                    return targetProfile
                })
        })
}

export default getTargetProfile