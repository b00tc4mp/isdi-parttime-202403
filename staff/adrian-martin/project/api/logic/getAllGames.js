import { User, Game } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const getAllGames = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw NotFoundError('User not found')

            return Game.find({})
                .populate('author', 'username')
                .select('-__v').sort({ date: -1 })
                .lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(games => {
                    games.forEach(game => {
                        game.id = game._id.toString()
                        delete game._id

                        if (game.author._id) {
                            game.author.id = game.author._id.toString()
                            delete game.author._id
                        }
                    });
                })
        })
}

export default getAllGames