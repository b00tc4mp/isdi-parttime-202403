import registerUser from "./registerUser";
import loginUser from "./loginUser";
import getUsersName from "./getUsersName";
import isUserLoggedIn from "./isUserLoggedIn";
import getUserId from "./getUserId";
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
   getUserId,
   logoutUser,

   getAllPosts,
   createPost,
   deletePost,
   likePost
};

export default logic;
