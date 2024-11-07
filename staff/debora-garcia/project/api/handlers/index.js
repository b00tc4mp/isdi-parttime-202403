import authenticateUserHandler from "./authenticateUserHandler.js";
import createPostHandler from "./createPostHandler.js";
import deleteResultHandler from "./deleteResultHandler.js";
import errorHandler from "./errorHandler.js";
import getPostsHandler from "./getPostHandler.js";
import getRandomWorkoutHandler from "./getRandomWorkoutHandler.js";
import getAllResultsHandler from "./getAllResultsHandler.js";
import getUsernameHandler from "./getUsernameHandler.js";
import registerUserHandler from "./registerUserHandler.js";
import toggleLikePostHandler from "./toggleLikePostHandler.js";
import createCommentHandler from "./createCommentHandler.js";
import updateResultHandler from "./updateResultHandler.js";
import getResultHandler from "./getResultHandler.js";
import getAllCommentsHandler from "./getAllCommentsHandler.js";


const routeHandler = {
    errorHandler,
    registerUserHandler,
    authenticateUserHandler,
    getUsernameHandler,

    getRandomWorkoutHandler,

    createPostHandler,
    getPostsHandler,
    getAllResultsHandler,
    toggleLikePostHandler,
    createCommentHandler,
    getAllCommentsHandler,

    deleteResultHandler,
    updateResultHandler,
    getResultHandler

}

export default routeHandler