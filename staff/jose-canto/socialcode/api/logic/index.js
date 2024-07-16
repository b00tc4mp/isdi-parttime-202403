import authenticateUser from "./authenticateUser.js"
import getUserName from "./getUserName.js"
import registerUser from "./registerUser.js"

import createPost from "./createPost.js"
import deletePost from "./deletePost.js"
import getAllPosts from "./getAllPosts.js"
import toggleLikePost from "./toggleLikePost.js"
import createPostComment from "./createPostComments.js"
import getPostComments from "./getPostComments.js"

import editPostTitle from "./editPostTitle.js"

const logic = {
  authenticateUser,
  getUserName,
  registerUser,
  toggleLikePost,

  createPostComment,


  createPost,
  deletePost,
  getAllPosts,
  getPostComments,
  editPostTitle
}

export default logic