import { User } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const getAllGamesUser = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found')
            }

            const gameList = user.gameList || []

            gameList.forEach(game => {
                game.id = game._id.toString()
                delete game._id

                if (game.author && game.author._id) {
                    game.author.id = game.author._id.toString()
                    delete game.author._id
                }
            });

            return gameList
        });
}

export default getAllGamesUser