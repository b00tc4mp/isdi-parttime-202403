import { User, Recipe } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

function rateRecipe(userId, recipeId, rating) {
    validate.id(userId, 'userId')
    validate.id(recipeId, 'recipeId')
    validate.number(rating, 'rating', { min: 1, max: 5 })

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Recipe.findById(recipeId)
                .catch(error => { throw new SystemError(error.message) })
                .then(recipe => {
                    if (!recipe)
                        throw new NotFoundError('user not found')

                    const userRating = recipe.rating.find(r => r.user.toString() === userId)

                    if (userRating) {
                        userRating.value = rating
                    } else {
                        recipe.ratings.push({ user: user._id, value: rating })
                    }

                    return recipe.save()
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default rateRecipe
