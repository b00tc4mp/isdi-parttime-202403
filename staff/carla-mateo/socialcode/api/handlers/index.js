import registerUserHandler from "./registerUserHandler.js"
import authenticateUserHandler from "./authenticateUserHandler.js"
import getUsernameHandler from "./getUsernameHandler.js"
import getAllPostsHandler from "./getAllPostsHandler.js"
import createPostHandler from "./createPostHandler.js"
import deletePostHandler from "./deletePostHandler.js"
import toggleLikePostHandler from "./toggleLikePostsHandler.js"
import createPostCommentHandler from "./createPostCommentHandler.js"
import errorHandler from "./errorHandler.js"
import editPostTitleHandler from "./editPostTitleHandler.js"


export default {
    registerUserHandler,
    authenticateUserHandler,
    getUsernameHandler,
    getAllPostsHandler,
    createPostHandler,
    deletePostHandler,
    toggleLikePostHandler,
    createPostCommentHandler,
    editPostTitleHandler,
    errorHandler
}

