import registerUserHandler from "./registerUserHandler.js"
import authenticateUserHandler from "./authenticateUserHandler.js"
import getUserNameHandler from "./getUserNameHandler.js"
import editProfileHandler from "./editProfileHandler.js"

import registerCustomHandler from "./registerCustomerHandler.js"
import getAllCustomersHandler from "./getAllCustomersHandler.js"
import getProfileUserHandler from "./getProfileUserHandler.js"

import getAllDeliveryNotesHandler from "./getAlldeliveryNotesHandler.js"
import getDeliveryNoteHandler from "./getDeliveryNoteHandler.js"

import createDeliveryNoteHandler from "./createDeliveryNoteHandler.js"

import createWorkHandler from "./createWorkHandler.js"


export default {
  registerUserHandler,
  authenticateUserHandler,
  getUserNameHandler,
  editProfileHandler,

  getProfileUserHandler,
  registerCustomHandler,
  getAllCustomersHandler,

  getAllDeliveryNotesHandler,
  getDeliveryNoteHandler,

  createDeliveryNoteHandler,

  createWorkHandler,

}