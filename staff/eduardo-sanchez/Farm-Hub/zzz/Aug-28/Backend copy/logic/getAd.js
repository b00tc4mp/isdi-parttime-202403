import { Ad } from '../data/index.js'

import { SystemError, NotFoundError } from 'com/errors.js'

import validate from 'com/validate.js'

const getAd = (adId) => {

    validate.id(adId, 'adId')

    return Ad.findById(adId).populate('author', 'username').populate('adcomments.author', 'username').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(ad => {
            if (!ad) {
                throw new NotFoundError('ad not found')
            }

            return ad
        })


}

export default getAd
