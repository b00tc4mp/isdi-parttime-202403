import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'

import getAllPosts from './getAllPosts.js'
import createPost from './createPost.js'
import deletePost from './deletePost.js'
import toggleLikePost from './toggleLikePost.js'
import createComment from './createComment.js'

const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    toggleLikePost,
    getAllPosts,
    createPost,
    deletePost,
    createComment
}

export default logic