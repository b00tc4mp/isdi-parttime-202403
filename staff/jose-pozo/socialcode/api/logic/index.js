import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'

import createPost from './createPost.js'
import deletePost from './deletePost.js'
import getAllPosts from './getAllPosts.js'
import toggleLikePost from './toggleLikePost.js'

import createPostComment from './createPostComment.js'
import getAllPostComments from './getAllPostComments.js'


const logic = {
    authenticateUser,
    getUserName,
    registerUser,

    createPost,
    deletePost,
    getAllPosts,
    toggleLikePost,

    createPostComment,
    getAllPostComments
}


export default logic