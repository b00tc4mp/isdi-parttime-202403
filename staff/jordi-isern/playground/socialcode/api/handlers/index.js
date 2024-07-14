import authenticateUserHandler from "./authenticateUserHandler.js";
import registerUserHandler from "./registerUserHandler.js";
import getUsernameHandler from "./getUsernameHandler.js";
import getAllPostsHandler from "./getAllPostHandler.js";
import createPostHandler from "./createPostHandler.js";
import deletePostHandler from "./deletePostHandler.js";
import toggleLikePostHandle from "./toggleLikePostHandle.js";
import createCommentPostHandler from "./createCommentPostHandler.js";

const routeHandler = {
    authenticateUserHandler,
    registerUserHandler,
    getUsernameHandler,
    getAllPostsHandler,
    createPostHandler,
    deletePostHandler,
    toggleLikePostHandle,
    createCommentPostHandler
}

export default routeHandler