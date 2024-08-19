import { User } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const getAllGamesUser = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .populate({
            path: 'gameList',
            select: '-__v',
        }).lean()
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found')
            }

            return user.gameList
        })
        .catch(error => {
            throw new SystemError(error.message)
        });
}

export default getAllGamesUser