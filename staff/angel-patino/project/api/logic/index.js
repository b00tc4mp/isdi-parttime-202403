import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'

import getAllRecipes from './getAllRecipes.js'
import getRecipeById from './getRecipeById.js'
import createRecipe from './createRecipe.js'
import deleteRecipe from './deleteRecipe.js'
import searchRecipes from './searchRecipes.js'
import editUsername from './editUsername.js'
import editRecipe from './editRecipe.js'
// import rateRecipe from './rateRecipe.js'
import toggleLikeRecipe from './toggleLikeRecipe.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    getAllRecipes,
    getRecipeById,

    createRecipe,
    deleteRecipe,
    searchRecipes,
    editUsername,
    editRecipe,
    toggleLikeRecipe,
    // rateRecipe
}

export default logic