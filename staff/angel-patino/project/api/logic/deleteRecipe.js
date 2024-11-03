import { User, Recipe } from '../data/index.js'
import { NotFoundError, SystemError, MatchError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const deleteRecipe = (userId, recipeId) => {
    validate.id(userId, 'userId')
    validate.id(recipeId, 'recipeId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Recipe.findById(recipeId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(recipe => {
                    if (!recipe) {
                        throw new NotFoundError('recipe not found')
                    }

                    if (recipe.author.toString() !== userId) {
                        throw new MatchError('recipe author does not match user')
                    }

                    return Recipe.deleteOne({ _id: recipeId })
                        .catch((error) => { throw new SystemError(error.message) })
                        .then((result) => { result })
                })
        })
}

export default deleteRecipe