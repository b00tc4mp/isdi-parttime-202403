import registerUser from './registerUser'
import loginUser from './loginUser'

import getUserName from './getUserName'
import isUserLoggedIn from './isUserLoggedIn'
import getLoggedInUsername from './getLoggedInUsername'
import logoutUser from './logoutUser'

import getAllPosts from './getAllPosts'
import createPost from './createPost'
import deletePost from './deletePost'

const logic = {
    registerUser,
    loginUser,

    getUserName,
    isUserLoggedIn,
    getLoggedInUsername,
    logoutUser,

    getAllPosts,
    createPost,
    deletePost
}

export default logic