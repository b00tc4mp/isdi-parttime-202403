import registerUserHandler from "./registerUserHandler.js"
import authenticateUserHandler from "./authenticateUserHandler.js"
import getUserNameHandler from "./getUserNameHandler.js"

import getAllPostsHandler from "./getAllPostsHandler.js"
import createPostHandler from "./createPostHandler.js"
import deletePostHandler from "./deletePostHandler.js"
import toggleLikePostHandler from "./toggleLikePostHandler.js"
import createPostCommentHandler from "./createPostCommentHandler.js"

import errorHandler from './errorHandler.js'

const handlers = {
  registerUserHandler,
  authenticateUserHandler,
  getUserNameHandler,

  getAllPostsHandler,
  createPostHandler,
  deletePostHandler,
  toggleLikePostHandler,
  createPostCommentHandler,

  errorHandler
}

export default handlers