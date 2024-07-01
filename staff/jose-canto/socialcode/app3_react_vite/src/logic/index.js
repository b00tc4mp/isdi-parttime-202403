import registerUser from "./registerUser"
import loginUser from "./loginUser"
import logoutUser from "./logoutUser"
import isUserLoggedIn from "./isUserLoggedIn"
import getUserName from "./getUserName"
import getLoggedInUsername from "./getLoggedInUsername"
import toggleLike from "./toggleLike"
import createComment from "./createComment"


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
  createComment,

  getAllPosts,
  createPost,
  deletePost,


}

export default logic