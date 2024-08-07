import { User, Game } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const createGame = (userId, title, image, rating, hours) => {
    validate.id(userId, 'userId')
    validate.text(title, 'title', 50)
    validate.url(image, 'image')
    validate.rating(rating, 'rating')
    validate.hours(hours, 'hours')

    return User.findById(userId).lean()
        .catch(() => { throw new SystemError('Connection error') })
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found')
            }

            const game = {
                author: userId,
                title,
                image,
                rating,
                hours
            }

            return Game.create(game)
                .catch(() => { throw new SystemError('Connection error') })
                .then(createdGame => {
                    return User.findByIdAndUpdate(userId, {
                        $push: { gameList: createdGame._id }
                    }).catch(() => {
                        throw new SystemError(('Error update user game list'))
                    }).then(() => createdGame)
                })
        })
}

export default createGame