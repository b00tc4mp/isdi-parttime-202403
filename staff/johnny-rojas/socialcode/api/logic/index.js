import authenticateUser from "./authenticateUser.js"
import registerUser from "./registerUser.js"
import getUserName from "./getUserName.js"

import getAllPosts from "./getAllPosts.js"
import createPost from "./createPost.js"
import deletePost from "./deletePost.js"
import toggleLikePost from "./toggleLikePost.js"

const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    getAllPosts,
    createPost,
    deletePost,
    toggleLikePost
}

export default logic