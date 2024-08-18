import { User, Recipe } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

function toggleLikeRecipe(userId, recipeId) {
    validate.id(userId, 'userId')
    validate.id(recipeId, 'recipeId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('User not found')

            return Recipe.findById(recipeId)
                .catch(error => { throw new SystemError(error.message) })
                .then(recipe => {
                    if (!recipe)
                        throw new NotFoundError('Recipe not found')

                    const included = recipe.likes.some(userObjectId => userObjectId.toString() === userId)

                    const updateOperation = included
                        ? { $pull: { likes: user._id } }
                        : { $push: { likes: user._id } };

                    return Recipe.findByIdAndUpdate(recipe._id, updateOperation, { new: true })
                        .catch(error => { throw new SystemError(error.message) })
                        .then(updatedRecipe => updatedRecipe)
                })
        })
}
export default toggleLikeRecipe