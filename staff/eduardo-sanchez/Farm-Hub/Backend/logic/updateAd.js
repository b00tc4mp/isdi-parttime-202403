import { User, Ad } from '../data/index.js'
import { MatchError, NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'


const updateAd = (userId, adId) => {
    validate.id(userId, 'userId')
    validate.id(adId, 'adId')

    return User.findById(userId).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found')
            }

            return Ad.findById(adId).lean()
                .catch((error) => { throw new SystemError(error.message) })
                .then(ad => {
                    if (!ad) {
                        throw new NotFoundError(' Ad not found')
                    }
                    if (ad.author.toString() !== userId) {
                        throw new MatchError('You can't update this ad')
                    }

                    return Ad.findByIdAndUpdate(adId, { title: title }, { new: true }).lean()
                        .catch((error) => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default updateAd

