
import registerUserHandler from './registerUserHandler.js'
import authenticateUserHandler from './authenticateUserHandler.js'
import getUserNameHandler from './getUserNameHandler.js'

import getAllPostsHandler from './getAllPostsHandler.js'
import createPostHandler from './createPostHandler.js'
import deletePostHandler from './deletePostHandler.js'
import toggleLikePostHandler from './toggleLikePostHandler.js'

const routeHandler = {
    registerUserHandler,
    authenticateUserHandler,
    getUserNameHandler,

    getAllPostsHandler,
    createPostHandler,
    deletePostHandler,
    toggleLikePostHandler,

}

export default routeHandler