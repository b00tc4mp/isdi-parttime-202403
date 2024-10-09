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
