import authenticateUserHandler from "./authenticateUserHandler.js";
import errorHandler from "./errorHandler.js";
import getRandomWorkoutHandler from "./getRandomWorkoutHandler.js";
import getUsernameHandler from "./getUsernameHandler.js";
import registerUserHandler from "./registerUserHandler.js";


const routeHandler = {
    errorHandler,
    registerUserHandler,
    authenticateUserHandler,
    getUsernameHandler,
    getRandomWorkoutHandler
}

export default routeHandler