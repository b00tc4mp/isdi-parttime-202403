import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'

import getAllPosts from './getAllPosts.js'
import createPost from './createPost.js'
import deletePost from './deletePost.js'
import toggleLikePost from './toggleLikePost.js'
import createPostComment from './createPostComment.js'


const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    getAllPosts,
    createPost,
    deletePost,
    toggleLikePost,
    createPostComment
}

export default logic