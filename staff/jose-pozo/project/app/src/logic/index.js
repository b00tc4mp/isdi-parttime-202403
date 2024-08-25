import registerUser from './registerUser'
import loginUser from './loginUser'


import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'

import getUserName from './getUserName'
import getAllCustomers from './getAllCustomers'
import getUserProfile from './getUserProfile'
import getAllServices from './getAllServices'

import createCustomer from './createCustomer'
import addService from './addService'

import deleteCustomer from './deleteCustomer'
import deleteService from './deleteService'

import updateCustomer from './updateCustomer'


const logic = {
    registerUser,
    loginUser,

    getUserName,
    getAllCustomers,
    getUserProfile,
    getAllServices,

    isUserLoggedIn,
    logoutUser,

    createCustomer,
    addService,

    deleteCustomer,
    deleteService,

    updateCustomer
}

export default logic