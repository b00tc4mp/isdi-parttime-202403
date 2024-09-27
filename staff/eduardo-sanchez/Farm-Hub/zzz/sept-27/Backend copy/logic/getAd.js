import { Ad } from '../data/index.js';

import { SystemError, NotFoundError } from 'com/errors.js';

import validate from 'com/validate.js';

const getAd = (adId) => {
    validate.id(adId, 'adId');

    return Ad.findById(adId)
        .populate('author', 'username')
        .populate('adcomments.author', 'username')
        .lean()
        .catch((error) => {
            throw new SystemError(error.message);
        })
        .then((ad) => {
            if (!ad) {
                throw new NotFoundError('ad not found');
            }

            return ad;

            // Uncommented: Returns the ad object as- is, with author and adcomments.author as objects containing a username field. It preserves all information about the author that was populated.

            //     Commented: Would transform the data, making author and adcomments.author simple strings containing just the username. it would reduce the author information to just the username string.

            // // Transform the author field to be just the username
            // ad.author = ad.author.username

            // // Transform the adcomments.author fields to be just the username
            // ad.adcomments = ad.adcomments.map(comment => ({
            //     ...comment,
            //     author: comment.author.username
            // }))

            // return ad
        });
};

export default getAd;

// import { Ad, User } from '../data/index.js';
// import { SystemError, NotFoundError } from 'com/errors.js';
// import validate from 'com/validate.js';

// import mongoose from 'mongoose'; // Asegúrate de importar mongoose si usas ObjectId
// const { ObjectId } = mongoose.Types;

// const getAd = (adId) => {
//     validate.id(adId, 'adId');

//     return Ad.findById(adId).lean()
//         .then(ad => {
//             if (!ad) {
//                 throw new NotFoundError('ad not found');
//             }

//             // Obtener el autor del anuncio
//             return User.findById(ad.author).select('username').lean()
//                 .then(author => {
//                     ad.author = author;

//                     // Obtener comentarios y sus autores
//                     return Promise.all(ad.adcomments.map(comment => {
//                         return User.findById(comment.author).select('username').lean()
//                             .then(commentAuthor => {
//                                 return { ...comment, author: commentAuthor };
//                             });
//                     }));
//                 })
//                 .then(commentsWithAuthors => {
//                     ad.adcomments = commentsWithAuthors;
//                     return ad; // Retornar el anuncio con los autores poblados
//                 });
//         })
//         .catch(error => {
//             throw new SystemError(error.message);
//         });
// };

// export default getAd;
