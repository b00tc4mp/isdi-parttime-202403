import { User, Recipe } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'
import { Types } from 'mongoose'

const { ObjectId } = Types

const deleteRecipe = (userId, recipeId) => {
    validate.id(userId, 'userId')
    validate.id(recipeId, 'recipeId')
    //buscamos al usuario
    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.findById(postId).lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(recipe => {
                    if (!recipe) {
                        throw new NotFoundError('post not found')
                    }
                    //soy yo?(username) el author del post?
                    if (recipe.author.toString() !== userId) {
                        throw new MatchError('post author does not match user')
                    }

                    return Recipe.deleteOne({ _id: new ObjectId(recipeId) })
                        .catch((error) => { throw new SystemError(error.message) })
                        .then(() => { })
                })
        })
}

export default deleteRecipe