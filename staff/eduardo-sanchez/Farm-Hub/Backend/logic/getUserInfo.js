import { User } from '../data/index.js';

import { NotFoundError, SystemError } from 'com/errors.js';

import validate from 'com/validate.js';

const getUserInfo = (userId) => {
    validate.id(userId, 'userId');

    return User.findById(userId)
        .lean()
        .select('-password')
        .catch((error) => {
            throw new SystemError(error.message);
        })
        .then((user) => {
            if (!user) throw new NotFoundError('user not found');

            delete user._id;

            return user;
        });
};

export default getUserInfo;
