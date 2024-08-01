import registerUser from "./registerUser.js"
import loginUser from "./loginUser.js"
import getUserName from "./getUserName.js"
import logoutUser from "./logoutUser.js"

import getAllCustomers from "./getAllCustomers.js"
import registerCustomer from "./registerCustomer.js"


const logic = {
  loginUser,
  registerUser,
  logoutUser,
  getUserName,

  registerCustomer,
  getAllCustomers,
}

export default logic
