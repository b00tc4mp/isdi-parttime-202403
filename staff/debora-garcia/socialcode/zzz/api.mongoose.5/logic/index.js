import registerUser from "./registerUser.js";
import authenticateUser from "./authenticateUser.js";
import getUsername from "./getUsername.js";

import getPosts from "./getPosts.js";
import createPost from "./createPost.js";
import deletePost from "./deletePost.js";
import toggleLikePost from "./toggleLikePost.js";
import editPostTitle from "./editPostTitle.js";

const logic = {
    registerUser,
    authenticateUser,
    getUsername,

    getPosts,
    createPost,
    deletePost,
    toggleLikePost,
    editPostTitle
}

export default logic