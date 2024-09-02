import registerUser from './registerUser.js'
import authenticateUser from './authenticateUser.js'

import getUserName from './getUserName.js'
import getAllCustomers from './getAllCustomers.js'
import getUserProfile from './getUserProfile.js'
import getAllServices from './getAllServices.js'
import getAllAppointments from './getAllAppointments.js'

import createCustomer from './createCustomer.js'
import addService from './addService.js'
import makeAppointment from './makeAppointment.js'

import deleteCustomer from './deleteCustomer.js'
import deleteService from './deleteService.js'
import deleteAppointment from './deleteAppointment.js'

import updateCustomer from './updateCustomer.js'
import updateService from './updateService.js'
import updateAppointment from './updateAppointment.js'


const logic = {
    registerUser,
    authenticateUser,

    getUserName,
    getAllCustomers,
    getUserProfile,
    getAllServices,
    getAllAppointments,

    createCustomer,
    addService,
    makeAppointment,

    deleteCustomer,
    deleteService,
    deleteAppointment,

    updateCustomer,
    updateService,
    updateAppointment
}


export default logic