import createUser from "./createUser.js";
import authenticateUser from "./authenticateUser.js";
import getUsersName from "./getUsersName.js";

import getPosts from "./getPosts.js";
import createPost from "./createPost.js";
import deletePost from "./deletePost.js";

// TODO: create shellscript tests
const logic = {
  createUser,
  authenticateUser,
  getUsersName,

  getPosts,
  createPost,
  deletePost,
};

export default logic;
