import errorHandler from "./errorHandler.js"

import registerUserHandler from './registerUserHandler.js'
import authenticateUserHandler from './authenticateUserHandler.js'

import getUserNameHandler from './getUserNameHandler.js'
import getAllCustomersHandler from './getAllCustomersHandler.js'
import getUserProfileHandler from './getUserProfileHandler.js'

import createCustomerHandler from './createCustomerHandler.js'

import deleteCustomerHandler from './deleteCustomerHandler.js'

import updateCustomerHandler from './updateCustomerHandler.js'


export default {
    errorHandler,

    registerUserHandler,
    authenticateUserHandler,

    getUserNameHandler,
    getAllCustomersHandler,
    getUserProfileHandler,

    createCustomerHandler,

    deleteCustomerHandler,

    updateCustomerHandler
}