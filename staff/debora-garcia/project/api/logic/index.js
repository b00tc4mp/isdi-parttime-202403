import registerUser from "./registerUser.js"
import authenticateUser from "./authenticateUser.js"
import getUsername from "./getUsername.js"
import getRandomWorkout from "./getRandomWorkout.js"
import createPost from "./createPost.js"
import getPosts from "./getPosts.js"
import getResults from "./getResults.js"
import toggleLikePost from "./toggleLikePost.js"
import deleteResult from "./deleteResult.js"
import updateResult from "./updateResult.js"



const logic = {
    registerUser,
    authenticateUser,
    getUsername,
    getRandomWorkout,
    createPost,
    getPosts,
    getResults,
    toggleLikePost,
    deleteResult,
    updateResult
}

export default logic