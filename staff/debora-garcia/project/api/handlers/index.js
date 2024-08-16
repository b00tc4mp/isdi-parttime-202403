import authenticateUserHandler from "./authenticateUserHandler.js";
import createPostHandler from "./createPostHandler.js";
import errorHandler from "./errorHandler.js";
import getPostsHandler from "./getPostHandler.js";
import getRandomWorkoutHandler from "./getRandomWorkoutHandler.js";
import getResultsHandler from "./getResultsHandler.js";
import getUsernameHandler from "./getUsernameHandler.js";
import registerUserHandler from "./registerUserHandler.js";


const routeHandler = {
    errorHandler,
    registerUserHandler,
    authenticateUserHandler,
    getUsernameHandler,
    getRandomWorkoutHandler,
    createPostHandler,
    getPostsHandler,
    getResultsHandler
}

export default routeHandler