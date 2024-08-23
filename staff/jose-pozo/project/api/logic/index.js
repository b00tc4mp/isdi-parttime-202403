import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'

import getUserName from './getUserName.js'
import getAllCustomers from './getAllCustomers.js'
import getUserProfile from './getUserProfile.js'

import createCustomer from './createCustomer.js'
import addService from './addService.js'

import deleteCustomer from './deleteCustomer.js'

import updateCustomer from './updateCustomer.js'


const logic = {
    registerUser,
    authenticateUser,

    getUserName,
    getAllCustomers,
    getUserProfile,

    createCustomer,
    addService,

    deleteCustomer,

    updateCustomer
}


export default logic