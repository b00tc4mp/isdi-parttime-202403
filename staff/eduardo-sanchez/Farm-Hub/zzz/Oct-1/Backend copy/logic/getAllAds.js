import { User, Ad } from '../data/index.js';
import { SystemError, NotFoundError } from 'com/errors.js';
import validate from 'com/validate.js';

const getAllAds = (userId) => {
    validate.id(userId, 'userId');

    return User.findById(userId)
        .lean()
        .catch((error) => {
            throw new SystemError(error.message);
        })
        .then((user) => {
            if (!user) {
                throw new NotFoundError('user not found');
            }

            return Ad.find({})
                .populate('author', 'username')
                .select('-__v')
                .sort({ date: -1 })
                .lean()
                .catch((error) => {
                    throw new SystemError(error.message);
                })
                .then((ads) => {
                    if (!ads || !ads.length)
                        throw new NotFoundError('ads not found');
                    return ads;
                });
        });
};

export default getAllAds;

// const formattedAds = ads.forEach((ad) => {
//     ad.id = ad._id.toString();
//     delete ad._id;

//     if (ad.author._id) {
//         ad.author.id = ad.author._id.toString();
//         delete ad.author._id;
//     }

////////////////////

// const formattedAds = ads.map((ad) => {
//     const { _id, author, ...rest } = ad; // Desestructura el anuncio
//     return {
//         id: _id.toString(), // Convierto _id a string
//         author: author && {
//             id: author._id.toString(),
//             username: author.username,
//         }, // Si el autor existe, lo convierto
//         ...rest,
//     };
// });

// console.log(
//     'Formatted Ads:',
//     JSON.stringify(formattedAds, null, 2)
// );
