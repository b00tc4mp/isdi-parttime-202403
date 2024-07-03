import registerUser from "./registerUser";
import loginUser from "./loginUser";
import getUsersName from "./getUsersName";
import isUserLoggedIn from "./isUserLoggedIn";
import getUsername from "./getUsername";
import logoutUser from "./logoutUser";

import getAllPosts from "./getAllPosts";
import createPost from "./createPost";
import deletePost from "./deletePost";
import likePost from "./likePost";

const logic = {
  registerUser,
  loginUser,
  getUsersName,
  isUserLoggedIn,
  getUsername,
  logoutUser,

  getAllPosts,
  createPost,
  deletePost,
  likePost,
};

export default logic;
