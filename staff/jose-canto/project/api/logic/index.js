import registerUser from "./registerUser.js"
import authenticateUser from "./authenticateUser.js"
import getUserName from "./getUserName.js"

import editProfile from "./editProfile.js"

import registerCustomer from "./registerCustomer.js"
import getAllCustomers from "./getAllCustomers.js"
import getProfileUser from "./getProfileUser.js"

import getAllDeliveryNotes from "./getAllDeliveryNotes.js"
import getDeliveryNote from "./getDeliveryNote.js"

import createDeliveryNote from "./createDeliveryNote.js"

import createWork from "./createWork.js"
import getAllInvoices from "./getAllInvoices.js"
import getInvoice from "./getInvoice.js"
import deleteDeliveryNote from "./deleteDeliveryNote.js"


const logic = {
  registerUser,
  authenticateUser,
  getUserName,

  editProfile,

  registerCustomer,
  getAllCustomers,
  getProfileUser,

  getAllDeliveryNotes,
  getDeliveryNote,
  deleteDeliveryNote,

  createDeliveryNote,
  createWork,

  getAllInvoices,
  getInvoice,
}

export default logic