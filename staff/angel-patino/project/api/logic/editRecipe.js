import { Recipe } from '../data/index.js'
import { NotFoundError, SystemError } from "com/errors.js"
import validate from "com/validate.js"


const editRecipe = (userId, recipeId, updates) => {
    validate.id(userId, 'userId')
    validate.id(recipeId, 'recipeId')

    const updateFields = {}

    if (updates.title) {
        validate.text(updates.title, 'title')
        updateFields.title = updates.title
    }

    if (updates.thumbnail) {
        validate.url(updates.thumbnail, 'thumbnail')
        updateFields.thumbnail = updates.thumbnail
    }

    if (updates.cookTime) {
        validate.number(updates.cookTime, 'coookTime')
        updateFields.cookTime = updates.cookTime
    }

    if (updates.ingredients) {
        validate.ingredientArray(updates.ingredients, 'ingredients')
        updateFields.ingredients = updates.ingredients
    }

    if (updates.description) {
        validate.text(updates.description, 'description')
        updateFields.description = updates.description
    }

    // if (updates.ratings) {
    //     validate.rating(updates.rating, 'rating')
    //     updateFields.rating = updates.ratings
    // }

    return Recipe.findOneAndUpdate({ _id: recipeId.toString(), author: userId }, updateFields, { new: true }).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(recipe => {
            if (!recipe) {
                throw new NotFoundError('Recipe not found')
            }
            return recipe
        })
}
export default editRecipe