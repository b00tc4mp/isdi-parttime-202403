import registerUser from "./registerUser.js"
import authenticateUser from "./authenticateUser.js"
import getUserName from "./getUserName.js"

import editProfile from "./editProfile.js"

import registerCustomer from "./registerCustomer.js"
import getAllCustomers from "./getAllCustomers.js"
import getProfileUser from "./getProfileUser.js"
import deleteCustomer from "./deleteCustomer.js"

import deleteDeliveryNote from "./deleteDeliveryNote.js"
import getAllDeliveryNotes from "./getAllDeliveryNotes.js"
import getDeliveryNote from "./getDeliveryNote.js"
import getAllDeliveryNotesCustomer from "./getAllDeliveryNotesCustomer.js"

import createDeliveryNote from "./createDeliveryNote.js"

import createWork from "./createWork.js"
import getAllInvoices from "./getAllInvoices.js"
import getInvoice from "./getInvoice.js"
import createInvoice from "./createInvoice.js"


const logic = {
  registerUser,
  authenticateUser,
  getUserName,

  editProfile,

  registerCustomer,
  getAllCustomers,
  getProfileUser,
  deleteCustomer,

  getAllDeliveryNotes,
  getDeliveryNote,
  deleteDeliveryNote,
  getAllDeliveryNotesCustomer,


  createDeliveryNote,
  createWork,

  getAllInvoices,
  getInvoice,
  createInvoice,
}

export default logic