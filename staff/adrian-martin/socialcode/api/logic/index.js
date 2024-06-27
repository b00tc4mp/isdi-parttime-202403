import authenticateUser from './authenticateUser.js'
import createPost from './createPost.js'
import deletePost from './deletePost.js'
import getAllPosts from './getAllPosts.js'
import getUserName from './getUserName.js'
import registerUser from './registerUser.js';

const logic = {
    registerUser,
    authenticateUser,
    getUserName,

    getAllPosts,
    createPost,
    deletePost
}

export default logic