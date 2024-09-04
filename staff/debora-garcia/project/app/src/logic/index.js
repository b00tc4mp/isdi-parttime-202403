import registerUser from "./registerUser";
import getUsername from "./getUsername";
import isUserLoggedIn from "./isUserLoggedIn";
import loginUser from "./loginUser";
import logoutUser from "./logoutUser";
import getUserId from "./getUserId";
import getRandomWorkout from "./getRandomWorkout";
import createPost from "./createPost";
import getPosts from "./getPosts";
import getAllResults from "./getAllResults";
import toggleLikePost from "./toggleLikePost";
import deleteResult from "./deleteResult";
import updateResult from "./updateResult";
import getResult from "./getResult";
import createComment from "./createComment";
import getAllComments from "./getAllComments";


const logic = {
    registerUser,
    loginUser,
    getUsername,
    logoutUser,
    isUserLoggedIn,
    getUserId,

    getRandomWorkout,

    createPost,
    getPosts,
    getAllResults,
    toggleLikePost,
    createComment,
    getAllComments,

    deleteResult,
    updateResult,
    getResult

}

export default logic