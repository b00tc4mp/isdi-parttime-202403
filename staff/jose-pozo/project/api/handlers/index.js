import errorHandler from "./errorHandler.js"

import registerUserHandler from './registerUserHandler.js'
import authenticateUserHandler from './authenticateUserHandler.js'

import getUserNameHandler from './getUserNameHandler.js'
import getAllCustomersHandler from './getAllCustomersHandler.js'
import getUserProfileHandler from './getUserProfileHandler.js'
import getAllServicesHandler from './getAllServicesHandler.js'
import getAllAppoinmentsHandlers from './getAllAppoinmentsHandlers.js'

import createCustomerHandler from './createCustomerHandler.js'
import addServiceHandler from './addServiceHandler.js'
import makeAppointmentHandler from './makeAppointmentHandler.js'

import deleteCustomerHandler from './deleteCustomerHandler.js'
import deleteServiceHandler from './deleteServiceHandler.js'
import deleteAppointmentHandler from './deleteAppointmentHandler.js'

import updateCustomerHandler from './updateCustomerHandler.js'
import updateServiceHandler from './updateServiceHandler.js'
import updateAppointmentHandler from './updateAppointmentHandler.js'


export default {
    errorHandler,

    registerUserHandler,
    authenticateUserHandler,

    getUserNameHandler,
    getAllCustomersHandler,
    getUserProfileHandler,
    getAllServicesHandler,
    getAllAppoinmentsHandlers,


    createCustomerHandler,
    addServiceHandler,
    makeAppointmentHandler,

    deleteCustomerHandler,
    deleteServiceHandler,
    deleteAppointmentHandler,

    updateCustomerHandler,
    updateServiceHandler,
    updateAppointmentHandler
}