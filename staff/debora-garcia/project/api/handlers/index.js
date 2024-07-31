import authenticateUserHandler from "./authenticateUserHandler.js";
import errorHandler from "./errorHandler.js";
import registerUserHandler from "./registerUserHandler.js";


const routeHandler = {
    errorHandler,
    registerUserHandler,
    authenticateUserHandler
}

export default routeHandler