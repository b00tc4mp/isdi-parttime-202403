import registerUser from './registerUser'
import loginUser from './loginUser'


import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'

import getUserName from './getUserName'
import getAllCustomers from './getAllCustomers'
import getUserProfile from './getUserProfile'

import createCustomer from './createCustomer'


const logic = {
    registerUser,
    loginUser,

    getUserName,
    getAllCustomers,
    getUserProfile,

    isUserLoggedIn,
    logoutUser,

    createCustomer,


}

export default logic