import registerUser from './registerUser'
import loginUser from './loginUser'


import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'

import getUserName from './getUserName'
import getAllCustomers from './getAllCustomers'
import getUserProfile from './getUserProfile'

import createCustomer from './createCustomer'
import addService from './addService'

import deleteCustomer from './deleteCustomer'

import updateCustomer from './updateCustomer'


const logic = {
    registerUser,
    loginUser,

    getUserName,
    getAllCustomers,
    getUserProfile,

    isUserLoggedIn,
    logoutUser,

    createCustomer,
    addService,

    deleteCustomer,

    updateCustomer
}

export default logic