import { User, Ad } from '../data/index.js'
import { SystemError, NotFoundError, CredentialsError } from 'com/errors.js'
import validate from 'com/validate.js'


const getUserAds = (userId, tokenUserId) => {

    validate.id(userId, 'userId')
    validate.id(tokenUserId, 'tokenUserId')

    if (userId !== tokenUserId) {
        throw new CredentialsError('User ID do not match the token User ID')
    }

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('User not found')

            return Ad.find({ author: userId }).populate('author', 'username').populate('adcomments.author', 'username').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(ads => {
                    if (!ads || ads.length === 0) throw new NotFoundError('Ads not found')
                    return ads
                })
        })
}

export default getUserAds


//////////////////////////////////////


// import { User, Ad } from '../data/index.js'
// import { SystemError, NotFoundError, CredentialsError } from 'com/errors.js'
// import validate from 'com/validate.js'


// const getUserAds = (userId) => {
//     validate.id(userId, 'userId')

//     return User.findById(userId).lean()
//         .catch(error => { throw new SystemError(error.message) })
//         .then(user => {
//             if (!user) throw new NotFoundError('user not found')

//             return Ad.find({ author: userId }).populate('author', 'username').populate('adcomments.author', 'username').lean()
//                 .catch(error => { throw new SystemError(error.message) })
//                 .then(ads => {
//                     if (!ads || ads.length === 0) throw new NotFoundError('ads not found')
//                     return ads
//                 })
//         })
// }

// export default getUserAds