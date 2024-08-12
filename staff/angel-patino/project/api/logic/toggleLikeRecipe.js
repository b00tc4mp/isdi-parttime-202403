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
                throw new NotFoundError('user not found')

            return Recipe.findById(recipeId)
                .catch(error => { throw new SystemError(error.message) })
                .then(recipe => {
                    if (!recipe)
                        throw new NotFoundError('user not found')

                    const included = recipe.likes.some(userObjectId => userObjectId.toString() === userId)

                    return Recipe.updateOne({ _id: postMessage._id },
                        included ?
                            { $pull: { likes: user._id } }
                            :
                            { $push: { likes: user._id } }
                    )
                        .catch(error => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}
export default toggleLikeRecipe