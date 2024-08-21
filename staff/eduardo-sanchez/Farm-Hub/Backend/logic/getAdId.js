import { Ad } from '../data/index.js'

import { SystemError, NotFoundError } from 'com/errors.js'


const getaAdId = (adId) => {

    return Ad.findById(adId).populate('author', 'username').lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(ad => {
            if (!ad) {
                throw new NotFoundError('ad not found')
            }

            return ad
        })


}

export default getaAdId
