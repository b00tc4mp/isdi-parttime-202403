import registerUser from './registerUser';
import loginUser from './loginUser';
import getUserName from './getUserName';
import getLoggedInUsername from './getLoggedInUsername';
import logoutUser from './logoutUser';
import isUserLoggedIn from './isUserLoggedIn';
import getUserId from './getUserId';

import getAllPosts from './getAllPosts';
import createPost from './createPost';
import deletePost from './deletePost';
import toggleLike from './toggleLike';
import createPostComment from './createPostComment';

const logic = {
    registerUser,
    loginUser,
    getUserName,
    getLoggedInUsername,
    isUserLoggedIn,
    logoutUser,
    getUserId,

    toggleLike,

    getAllPosts,
    createPost,
    deletePost,
    createPostComment
}

export default logic