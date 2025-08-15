import registerUser from "./registerUser";
import loginUser from "./loginUser";
import getUsername from "./getUsername"
import isUserLoggedIn from "./isUserLoggedIn";
import getLoggedInUsername from "./getLoggedInUsername";
import logoutUser from "./logoutUser";

import getPosts from "./getPosts";
import createPost from "./createPost";
import deletePost from "./deletePost";

const logic = {
    registerUser,
    loginUser,
    getUsername,
    isUserLoggedIn,
    getLoggedInUsername,
    logoutUser,

    getPosts,
    createPost,
    deletePost

}

export default logic