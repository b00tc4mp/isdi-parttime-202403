import isUserLoggedIn from "./isUserLoggedIn.js"
import registerUser from "./registerUser.js"
import loginUser from "./loginUser.js"
import getUserName from "./getUserName.js"
import logoutUser from "./logoutUser.js"

import getAllCustomers from "./getAllCustomers.js"
import registerCustomer from "./registerCustomer.js"

import editProfile from "./EditProfile.js"
import getProfileUser from "./getProfileUser.js"

import getAllDeliveryNotes from "./getAllDeliveryNotes.js"
import getDeliveryNote from "./getDeliveryNote.js"

import createDeliveryNote from "./createDeliveryNote.js"
import createWork from "./createWork.js"


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

  getAllDeliveryNotes,
  getDeliveryNote,

  createDeliveryNote,
  createWork,
}

export default logic
