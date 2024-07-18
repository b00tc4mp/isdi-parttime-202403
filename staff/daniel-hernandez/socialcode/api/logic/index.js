import createUser from "./users/createUser.js";
import authenticateUser from "./users/authenticateUser.js";
import getUsersName from "./users/getUsersName.js";

import getPosts from "./posts/getPosts.js";
import createPost from "./posts/createPost.js";
import deletePost from "./posts/deletePost.js";
import likePost from "./posts/likePost.js";

// TODO: implement testing with mocha and chai
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
