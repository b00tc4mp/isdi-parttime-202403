import { User, Ad } from '../data/index.js'
import { SystemError, NotFoundError, MatchError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const deleteAd = (userId, adId) => {
    validate.id(userId, 'userId')
    validate.id(adId, 'adId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found')
            }

            return Ad.findById(adId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(ad => {
                    if (!ad) {
                        throw new NotFoundError('ad not found')
                    }

                    if (ad.author.toString() !== userId) {
                        throw new MatchError('ad author does not match user & cannot be deleted')
                    }

                    return Ad.findByIdAndDelete(adId).lean()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => adId)
                })
        })
}

export default deleteAd