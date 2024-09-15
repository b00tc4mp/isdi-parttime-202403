import registerUser from './registerUser'
import loginUser from './loginUser'


import isUserLoggedIn from './isUserLoggedIn'
import logoutUser from './logoutUser'

import getUserName from './getUserName'
import getAllCustomers from './getAllCustomers'
import getUserProfile from './getUserProfile'
import getAllServices from './getAllServices'
import getAllAppointments from './getAllAppointments'

import createCustomer from './createCustomer'
import addService from './addService'
import makeAppointment from './makeAppointment'

import deleteCustomer from './deleteCustomer'
import deleteService from './deleteService'
import deleteAppointment from './deleteAppointment'

import updateCustomer from './updateCustomer'
import updateService from './updateService'
import updateAppointment from './updateAppointment'


const logic = {
    registerUser,
    loginUser,

    getUserName,
    getAllCustomers,
    getUserProfile,
    getAllServices,
    getAllAppointments,

    isUserLoggedIn,
    logoutUser,

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