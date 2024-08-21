// import { User, Game } from '../data/index.js'
// import validate from 'com/validate.js'
// import { NotFoundError, SystemError } from 'com/errors.js'

// const getAllGamesUser = userId => {
//     validate.id(userId, 'userId')

//     return User.findById(userId)
//         .lean()
//         .catch(error => { throw new SystemError(error.message) })
//         .then(user => {
//             if (!user) {
//                 throw new NotFoundError('User not found')
//             }

//             return Game.find({ author: userId }).lean()
//                 .catch(error => { throw new SystemError(error.message) })
//                 .then(games => {
//                     games.forEach(game => {
//                         game.id = game._id.toString()
//                         delete game._id

//                         if (game.author._id) {
//                             game.author.id = game.author._id.toString()
//                             delete game.author._id
//                         }
//                     })

//                     return games
//                 })
//         });
// }

// export default getAllGamesUser

//BSONError: Cannot create Buffer from 66c4cf978c7697

//Error retrieving games: Error [ERR_INTERNAL_ASSERTION]: Error [ERR_INTERNAL_ASSERTION]: BSONError: Cannot create Buffer from 66c4cf978c769799b033ac61
// at Object.toLocalBufferType (C:\Users\Adrian\workspace\isdi-parttime-202403\staff\adrian-martin\project\api\node_modules\bson\lib\bson.cjs:232:15)

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