import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'
import getUserName from './getUserName.js'

import createPost from './createPost.js'
import deletePost from './deletePost.js'
import getAllPosts from './getAllPosts.js'



const logic = {
    authenticateUser,
    getUserName,
    registerUser,

    createPost,
    deletePost,
    getAllPosts
}


export default logic