import { User, Game } from '../data/index.js'
import { MatchError, NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

import { Types } from 'mongoose'
const { ObjectId } = Types

const deleteGame = (userId, gameId) => {
    validate.id(userId, 'userId')
    validate.id(gameId, 'gameId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Game.findById(gameId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(game => {
                    if (!game) throw new NotFoundError('game not found')

                    if (game.author.toString() !== userId)
                        throw new MatchError('user does not own the game')

                    return Game.deleteOne({ _id: new ObjectId(gameId) })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default deleteGame