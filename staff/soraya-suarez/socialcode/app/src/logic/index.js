import registerUser from './registerUser'
import loginUser from './loginUser'
import getUserName from './getUserName'
import isUserLoggedIn from './isUserLoggedIn'
import getUserId from './getUserId'
import logoutUser from './logoutUser'

import getAllPosts from './getAllPosts'
import createPost from './createPost'
import modifyPost from './modifyPost'
import deletePost from './deletePost'
import toggleLikePost from './toggleLikePost'

const logic = {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    getUserId,
    logoutUser,

    getAllPosts,
    createPost,
    modifyPost,
    deletePost,
    toggleLikePost
}

export default logic