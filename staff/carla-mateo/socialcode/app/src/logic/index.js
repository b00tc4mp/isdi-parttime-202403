import registerUser from './registerUser'
import loginUser from './loginUser'
import getUserName from './getUserName'
import isUserLoggedIn from './isUserLoggedIn'
import getUserId from './getUserId'
import logoutUser from './logoutUser'

import getAllPosts from './getAllPosts'
import createPost from './createPost'
import deletePost from './deletePost'
import toggleLikePost from './toggleLikePost'
import createPostComment from './createPostComment'
import editPostTitle from './editPostTitle'


const logic = {
    registerUser,
    loginUser,
    getUserName,
    isUserLoggedIn,
    getUserId,
    logoutUser,

    getAllPosts,
    createPost,
    deletePost,
    toggleLikePost,
    createPostComment,
    editPostTitle
}

export default logic