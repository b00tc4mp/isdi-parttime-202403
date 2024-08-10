import { NotFoundError, SystemError } from 'com/errors.js'
import { Game } from '../data/index.js'
import validate from 'com/validate.js'

const editGame = (userId, updates) => {
    validate.id(userId, 'userId')

    const updateFields = {}

    if (updates.title) {
        validate.text(updates.title, 'title')
        updateFields.title = updates.title
    }

    if (updates.image) {
        validate.url(updates.image, 'image')
        updateFields.image = updates.image
    }

    if (updates.rating) {
        validate.rating(updates.rating, 'rating')
        updateFields.rating = updates.rating
    }

    if (updates.hours) {
        validate.hours(updates.hours, 'hours')
        updateFields.hours = updates.hours
    }

    return Game.findByIdAndUpdate(userId, updateFields, { new: true }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(game => {
            if (!game) {
                throw new NotFoundError('Game not found')
            }
            return game
        })
}

export default editGame