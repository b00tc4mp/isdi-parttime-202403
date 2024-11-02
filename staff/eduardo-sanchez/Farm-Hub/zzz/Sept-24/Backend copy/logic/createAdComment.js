import { User, Ad } from '../data/index.js';
import { SystemError, NotFoundError } from 'com/errors.js';
import validate from 'com/validate.js';

const createAdComment = (userId, adId, text) => {
    validate.id(userId, 'userId');
    validate.id(adId, 'adId');
    validate.text(text, 'comment', 120);

    return User.findById(userId)
        .lean()
        .catch((error) => {
            throw new SystemError(error.message);
        })
        .then((user) => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            return Ad.findById(adId)
                .lean()
                .catch((error) => {
                    throw new SystemError(error.message);
                })
                .then((ad) => {
                    if (!ad) {
                        throw new NotFoundError('ad not found');
                    }

                    return Ad.findByIdAndUpdate(adId, {
                        $push: {
                            adcomments: {
                                author: userId,
                                comment: text,
                                date: new Date(),
                            },
                        },
                    })
                        .catch((error) => {
                            throw new SystemError(error.message);
                        })
                        .then((ad) => {
                            // if (!ad) throw new NotFoundError('ad not found')

                            return ad;
                        });
                });
        });
};

export default createAdComment;

//             const adcomment = {
//                 author: userId,
//                 comment: text,
//                 date: new Date()
//             }

//             if (!ad.adcomments) ad.adcomments = []
//             ad.adcomments.push(adcomment)
//             return ad.save()

//                 .catch(error => { throw new SystemError(error.message) })
//                 .then(() => adcomment)
//         })
// })
//}
