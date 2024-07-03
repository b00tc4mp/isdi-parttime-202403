import registerUser from "./registerUser"
import loginUser from "./loginUser"
import logoutUser from "./logoutUser"
import isUserLoggedIn from "./isUserLoggedIn"
import getUserName from "./getUserName"
import getLoggedInUsername from "./getLoggedInUsername"

import toggleLike from "./toggleLike"
import createPostComment from "./createPostComment"
import getPostComments from "./getPostComments"


import getAllPosts from "./getAllPosts"
import createPost from "./createPost"
import deletePost from "./deletePost"


const logic = {

  registerUser,
  loginUser,
  logoutUser,
  isUserLoggedIn,
  getUserName,
  getLoggedInUsername,

  toggleLike,
  createPostComment,
  getPostComments,

  getAllPosts,
  createPost,
  deletePost,

}

export default logic