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

  createDeliveryNote,
  createWork,
}

export default logic