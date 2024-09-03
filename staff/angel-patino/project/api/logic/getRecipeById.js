import { Recipe } from '../data/index.js';
import validate from 'com/validate.js';
import { NotFoundError, SystemError } from 'com/errors.js';

const getRecipeById = recipeId => {
    try { // Validar el recipeId
        validate.id(recipeId, 'recipeId');

        return Recipe.findById(recipeId)
            .populate('author', 'username')
            .select('-__v')
            .lean()
            .then(recipe => {
                if (!recipe) {
                    throw new NotFoundError('Recipe not found');
                }

                // Transformar los datos de la receta
                recipe.id = recipe._id.toString()
                delete recipe._id

                if (recipe.author._id) {
                    recipe.author.id = recipe.author._id.toString()
                    delete recipe.author._id;
                }

                recipe.likes = recipe.likes.map(userObjectId => userObjectId.toString())

                return recipe
            })
            .catch(error => {
                throw new SystemError(error.message)
            })
    } catch (error) {
        throw new SystemError(error.message)
    }

}

export default getRecipeById
