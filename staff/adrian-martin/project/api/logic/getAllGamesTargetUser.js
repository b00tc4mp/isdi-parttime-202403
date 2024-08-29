import { User, Game } from '../data/index.js'
import validate from 'com/validate.js'
import { SystemError, NotFoundError } from 'com/errors.js'

const getAllGamesTargetUser = (userId, targetUserId) => {
    validate.id(userId, 'userId')
    validate.id(targetUserId, 'targetUserId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('User not found')

            return User.findById(targetUserId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(targetUser => {
                    if (!targetUser)
                        throw new NotFoundError('Target user not found')

                    return Game.find({ author: targetUserId }).lean()
                })
                .then(games => {
                    return games.map(game => {
                        const { _id, author, ...rest } = game
                        return {
                            id: _id.toString(),
                            author: author ? {
                                id: author.toString()
                            } : null,
                            ...rest
                        }
                    })
                })
                .catch(error => {
                    throw new SystemError(error.message)
                })
        })
}

export default getAllGamesTargetUser