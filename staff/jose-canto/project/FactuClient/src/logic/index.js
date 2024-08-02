import isUserLoggedIn from "./isUserLoggedIn.js"
import registerUser from "./registerUser.js"
import loginUser from "./loginUser.js"
import getUserName from "./getUserName.js"
import logoutUser from "./logoutUser.js"

import getAllCustomers from "./getAllCustomers.js"
import registerCustomer from "./registerCustomer.js"
import getCustomer from "./getCustomer.js"


const logic = {
  isUserLoggedIn,
  loginUser,
  registerUser,
  logoutUser,
  getUserName,

  registerCustomer,

  getCustomer,
  getAllCustomers
}

export default logic
