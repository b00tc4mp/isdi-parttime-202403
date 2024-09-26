import validate from 'com/validate.js';
import { User } from '../../data/index.js';
import { NotFoundError, SystemError } from 'com/errors.js';

const getUserInfo = (userId, userInfoId) => {
    validate.id(userId, 'userId')
    validate.id(userInfoId, 'userInfoId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return User.findById(userInfoId).lean().select('-__v')
                .catch(error => { throw new SystemError(error.message) })
                .then(userInfo => {
                    if (!userInfo)
                        throw new NotFoundError('userInfo not found')
                    userInfo.id = userInfo._id
                    delete userInfo._id
                    return userInfo
                })
        })
}

export default getUserInfo