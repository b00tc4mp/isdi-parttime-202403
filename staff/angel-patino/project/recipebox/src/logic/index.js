import registerUser from './registerUser'
import loginUser from './loginUser'
import getUserName from './getUserName'
import isUserLoggedIn from './isUserLoggedIn'
import getUserId from './getUserId'
import logoutUser from './logoutUser'

import getAllRecipes from './getAllRecipes'
import createRecipe from './createRecipe'
import deleteRecipe from './deleteRecipe'
import toggleLikeRecipe from './toggleLikeRecipe'
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
    toggleLikeRecipe,
    // rateRecipe
}

export default logic