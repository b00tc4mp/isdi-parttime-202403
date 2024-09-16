import { User, Ad } from '../data/index.js'
import { SystemError, NotFoundError } from 'com/errors.js'
import validate from 'com/validate.js'


const getUserComments = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Ad.find({ 'adcomments.author': userId }).populate('author', 'username').populate('adcomments.author', 'username').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(ads => {
                    if (!ads || ads.length === 0) throw new NotFoundError('No ads found with user comments')

                    // return ads

                    const adsWithUserComments = ads.map(ad => ({
                        ...ad, adcomments: ad.adcomments.filter(comment => comment.author._id.toString() === userId)

                    })).filter(ad => ad.adcomments.length > 0)

                    // if (adsWithUserComments.length === 0) throw new NotFoundError('No comments found for this user')


                    return adsWithUserComments
                })
        })
}

export default getUserComments

// const getUserComments = (userId) => {
//     validate.id(userId, 'userId');

//     return User.findById(userId).lean()
//         .catch(error => { throw new SystemError(error.message); })
//         .then(user => {
//             if (!user) throw new NotFoundError('user not found');

//             return Ad.find({}).populate('author', 'username').populate('adcomments.author', 'username').lean()
//                 .catch(error => { throw new SystemError(error.message); })
//                 .then(ads => {
//                     const adsWithUserComments = ads.map(ad => ({
//                         ...ad,
//                         adcomments: ad.adcomments.filter(comment => comment.author._id.toString() === userId)
//                     })).filter(ad => ad.adcomments.length > 0);

//                     if (adsWithUserComments.length === 0) {
//                         throw new NotFoundError('No comments found for this user');
//                     }

//                     return adsWithUserComments;
//                 });
//         });
// };

