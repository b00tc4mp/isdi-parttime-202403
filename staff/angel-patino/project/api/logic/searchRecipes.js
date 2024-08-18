import { Recipe } from '../data/index.js'
import validate from 'com/validate.js'
import { SystemError } from 'com/errors.js'

const searchRecipes = (query) => {
    validate.text(query, 'query')

    return Recipe.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { ingredients: { $regex: query, $options: 'i' } }
        ]
    }).populate('author', 'username').lean()
        .catch(error => { throw new SystemError(error.message) })
}

export default searchRecipes
