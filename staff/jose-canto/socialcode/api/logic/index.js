import authenticateUser from "./authenticateUser.js"
import getUserName from "./getUserName.js"
import registerUser from "./registerUser.js"

import createPost from "./createPost.js"
import deletePost from "./deletePost.js"
import getAllPosts from "./getAllPosts.js"
import toggleLike from "./toggleLike.js"
import createPostComment from "./createPostComments.js"
import getPostComments from "./getPostComments.js"

const logic = {
  authenticateUser,
  getUserName,
  registerUser,
  toggleLike,

  createPostComment,


  createPost,
  deletePost,
  getAllPosts,
  getPostComments
}

export default logic