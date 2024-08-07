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
}

export default logic
