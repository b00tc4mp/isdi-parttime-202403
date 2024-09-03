import { User, Recipe } from '../data/index.js'
import validate from 'com/validate.js'
import { NotFoundError, SystemError } from 'com/errors.js'

const getAllRecipes = userId => {
    validate.id(userId, 'userId')

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('User not found')

            return Recipe.find({}).populate('author', 'username').select('-__v').sort({ date: -1 }).lean()
                .catch((error) => { throw new SystemError(error.message) })
                .then(recipes => {
                    recipes.forEach((recipe) => {
                        recipe.id = recipe._id.toString()
                        delete recipe._id

                        if (recipe.author._id) {
                            recipe.author.id = recipe.author._id.toString()

                            delete recipe.author._id
                        }

                        recipe.likes = recipe.likes.map(userObjectId => userObjectId.toString())
                    })
                    return recipes
                })
        })
}

export default getAllRecipes