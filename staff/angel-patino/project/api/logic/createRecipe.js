import { User, Recipe } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createRecipe = (userId, title, thumbnail, cookTime, ingredients, description, rating) => {
    validate.id(userId, 'userId')
    validate.text(title, 'title', 25)
    validate.url(thumbnail, 'image')
    validate.number(cookTime, 'cookTime')
    validate.ingredientArray(ingredients, 'ingredients')
    validate.text(description, 'description')
    validate.rating(rating, 'rating')



    return User.findById(userId).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            const recipe = {
                author: userId,
                title,
                thumbnail,
                cookTime,
                ingredients,
                description,
                date: new Date(),
                rating
            }

            return Recipe.create(recipe)
                .catch((error) => { throw new SystemError(error.message) })
                .then(createdRecipe => {
                    return User.findByIdAndUpdate(userId, {
                        $push: { recipeList: createdRecipe._id }
                    }).catch(() => {
                        throw new SystemError((error.message))
                    }).then(() => createdRecipe)
                })
        })

}

export default createRecipe