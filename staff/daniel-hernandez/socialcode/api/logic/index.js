import createUser from "./createUser.js";
import authenticateUser from "./authenticateUser.js";
import getUsersName from "./getUsersName.js";

import getPosts from "./getPosts.js";
import createPost from "./createPost.js";
import deletePost from "./deletePost.js";
import likePost from "./likePost.js";

const logic = {
  createUser,
  authenticateUser,
  getUsersName,

  getPosts,
  createPost,
  deletePost,
  likePost,
};

export default logic;
