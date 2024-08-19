import registerUserHandler from "./registerUserHandler.js"
import authenticateUserHandler from "./authenticateUserHandler.js"
import getUserNameHandler from "./getUserNameHandler.js"
import editProfileHandler from "./editProfileHandler.js"

import registerCustomHandler from "./registerCustomerHandler.js"
import getAllCustomersHandler from "./getAllCustomersHandler.js"
import getProfileUserHandler from "./getProfileUserHandler.js"
import deleteCustomerHandler from "./deleteCustomerHandler.js"

import getAllDeliveryNotesHandler from "./getAlldeliveryNotesHandler.js"
import getDeliveryNoteHandler from "./getDeliveryNoteHandler.js"
import deleteDeliveryNoteHandler from "./deleteDeliveryNoteHandler.js"
import getAllDeliveryNotesCustomerHandler from "./getAllDeliveryNotesCustomerHandler.js"

import createDeliveryNoteHandler from "./createDeliveryNoteHandler.js"

import createWorkHandler from "./createWorkHandler.js"

import getAllInvoicesHandler from "./getAllInvoicesHandler.js"
import getInvoiceHandler from "./getInvoiceHandler.js"
import createInvoiceHandler from "./createInvoiceHandler.js"
import deleteInvoiceHandler from "./deleteInvoiceHandler.js"

export default {
  registerUserHandler,
  authenticateUserHandler,
  getUserNameHandler,
  editProfileHandler,

  getProfileUserHandler,
  registerCustomHandler,
  getAllCustomersHandler,
  deleteCustomerHandler,

  getAllDeliveryNotesCustomerHandler,
  getAllDeliveryNotesHandler,
  getDeliveryNoteHandler,
  deleteDeliveryNoteHandler,

  createDeliveryNoteHandler,

  createWorkHandler,

  getAllInvoicesHandler,
  getInvoiceHandler,
  createInvoiceHandler,
  deleteInvoiceHandler,
}