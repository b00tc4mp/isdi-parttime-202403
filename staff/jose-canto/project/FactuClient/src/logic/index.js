import isUserLoggedIn from "./isUserLoggedIn.js"
import registerUser from "./registerUser.js"
import loginUser from "./loginUser.js"
import getUserName from "./getUserName.js"
import logoutUser from "./logoutUser.js"

import getAllCustomers from "./getAllCustomers.js"
import registerCustomer from "./registerCustomer.js"
import deleteCustomer from "./deleteCustomer.js"

import editProfile from "./EditProfile.js"
import getProfileUser from "./getProfileUser.js"

import getAllDeliveryNotes from "./getAllDeliveryNotes.js"
import getDeliveryNote from "./getDeliveryNote.js"
import deleteDeliveryNote from "./deleteDeliveryNote.js"

import createDeliveryNote from "./createDeliveryNote.js"
import createWork from "./createWork.js"

import getAllInvoices from "./getAllInvoices.js"
import getInvoice from "./getInvoice.js"


const logic = {
  isUserLoggedIn,
  loginUser,
  registerUser,
  logoutUser,
  getUserName,

  registerCustomer,

  editProfile,
  getProfileUser,
  getAllCustomers,
  deleteCustomer,

  getAllDeliveryNotes,
  getDeliveryNote,
  deleteDeliveryNote,


  createDeliveryNote,
  createWork,

  getAllInvoices,
  getInvoice,
}

export default logic
