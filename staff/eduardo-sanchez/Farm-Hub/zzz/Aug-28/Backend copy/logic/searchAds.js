import { Ad } from '../data/index.js'

import { SystemError, NotFoundError } from 'com/errors.js'


const searchAds = (query) => {

    const regexp = new RegExp(query, 'i')

    return Ad.find({ title: { $regex: regexp } }).populate('author', 'username').select('-__v').sort({ date: -1 }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(ads => {
            if (!ads) throw new NotFoundError('ads not found')


            return ads
        })

}

export default searchAds

