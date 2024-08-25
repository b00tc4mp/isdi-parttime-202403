import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'

import getUserName from './getUserName.js'
import getAllCustomers from './getAllCustomers.js'
import getUserProfile from './getUserProfile.js'
import getAllServices from './getAllServices.js'

import createCustomer from './createCustomer.js'
import addService from './addService.js'

import deleteCustomer from './deleteCustomer.js'
import deleteService from './deleteService.js'

import updateCustomer from './updateCustomer.js'
import updateService from './updateService.js'


const logic = {
    registerUser,
    authenticateUser,

    getUserName,
    getAllCustomers,
    getUserProfile,
    getAllCustomers,
    getAllServices,

    createCustomer,
    addService,

    deleteCustomer,
    deleteService,

    updateCustomer,
    updateService
}


export default logic