import { User, Recipe } from '../data/index.js'
import { NotFoundError, SystemError } from 'com/errors.js'
import validate from 'com/validate.js'

const createRecipe = (userId, title, source, thumbnail, cookTime, ingredients, description, rating) => {
    validate.id(userId, 'userId')
    validate.text(title, 'title', 25)
    validate.text(source, 'source', 25)
    validate.url(thumbnail, 'image')
    validate.number(cookTime, 'cookTime')
    validate.arrayOfString(ingredients, 'ingredients')
    validate.text(description, 'description')
    validate.number(rating, 'rating', { min: 1, max: 5 })



    return User.findById(userId).lean()
        .catch((error) => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            const recipe = {
                author: userId,
                title,
                source,
                thumbnail,
                cookTime,
                ingredients,
                description,
                date: new Date(),
                rating
            }

            return Recipe.create(recipe)
                .catch((error) => { throw new SystemError(error.message) })
                .then(() => { })
        })

}

export default createRecipe