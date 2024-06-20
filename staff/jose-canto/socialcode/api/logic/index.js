import authenticateUser from "./authenticateUser.js"
import getUserName from "./getUserName.js"
import registerUser from "./registerUser.js"

import createPost from "./createPost.js"
import deletePost from "./deletePost.js"
import getAllPosts from "./getAllPosts.js"
import toggleLike from "./toggleLike.js"

const logic = {
  authenticateUser,
  getUserName,
  registerUser,
  toggleLike,

  createPost,
  deletePost,
  getAllPosts,
}

export default logic