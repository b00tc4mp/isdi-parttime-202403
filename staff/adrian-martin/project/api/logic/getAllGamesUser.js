import { User, Game } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const getAllGamesUser = (userId) => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found')
            }

            return Game.find({ author: userId }).lean()
        })
        .then(games => {
            return games.map(game => {
                const { _id, author, ...rest } = game
                return {
                    id: _id.toString(), //convertir objectId to string
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
}

export default getAllGamesUser