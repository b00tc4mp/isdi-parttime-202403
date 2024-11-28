import registerUser from "./regiterUser"
import loginUser from "./loginUser"
import getUserName from "./getUserName"
import isUserLoggedIn from "./isUserLoggedIn"
import getUserId from "./getUserId"
import logoutUser from "./logoutUser"
  
import getAllPosts from "./getAllPosts"
import createPost from "./createPost"
import deletePost from "./deletePost"
import toggleLikePost from "./toggleLikePost"

const logic = {
  registerUser,
  loginUser,
  getUserName,
  getUserId,
  isUserLoggedIn,
  logoutUser,

  getAllPosts,
  createPost,
  deletePost,
  toggleLikePost
}

export default logic