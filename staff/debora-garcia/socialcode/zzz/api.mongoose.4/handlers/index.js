import authenticateUserHandler from "./authenticateUserHandler.js";
import createPostHandler from "./createPostHandler.js";
import deletePostHandler from "./deletePostHandler.js";
import editPostHandler from "./editPostHandler.js";
import getPostsHandler from "./getPostsHandler.js";
import getUsernameHandler from "./getUsernameHandler.js";
import registerUserHandler from "./registerUserHandler.js";
import toggleLikePostHandler from "./toggleLikePostHandler.js";

const routeHandler = {
    registerUserHandler,
    authenticateUserHandler,
    getUsernameHandler,
    getPostsHandler,
    createPostHandler,
    deletePostHandler,
    toggleLikePostHandler,
    editPostHandler
}

export default routeHandler