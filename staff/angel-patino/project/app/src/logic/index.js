import registerUser from './registerUser'
import loginUser from './loginUser'
import getUserName from './getUserName'
import isUserLoggedIn from './isUserLoggedIn'
import getUserId from './getUserId'
import logoutUser from './logoutUser'

import getAllRecipes from './getAllRecipes'
import createRecipe from './createRecipe'
import deleteRecipe from './deleteRecipe'
import getRecipeById from './getRecipeById'
import toggleLikeRecipe from './toggleLikeRecipe'
import updateRecipe from './updateRecipe'
import searchRecipes from './searchRecipes'
// import rateRecipe from './rateRecipe'

const logic = {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    getUserId,
    logoutUser,

    getAllRecipes,
    createRecipe,
    deleteRecipe,
    getRecipeById,
    toggleLikeRecipe,
    updateRecipe,
    searchRecipes
    // rateRecipe
}

export default logic