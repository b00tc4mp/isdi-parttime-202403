import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'
import createRecipe from './createRecipe.js'
import deleteRecipe from './deleteRecipe.js'
import editUsername from './editUsername.js'
import rateRecipe from './rateRecipe.js'
import toggleLikeRecipe from './toggleLikeRecipe.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,
    createRecipe,
    deleteRecipe,
    editUsername,
    toggleLikeRecipe,
    rateRecipe
}

export default logic