import validate from "com/validate.js"
import { User, Invoice } from "../model/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const getAllInvoices = (userId) => {
  validate.id(userId, "userId")

  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError("user not found")
      }

      return Invoice.find({}).populate("company", "companyName username").select("-__v").lean()
        .catch(error => { throw new SystemError(error.message) })
        .then((invoices) => {
          invoices.forEach((invoice) => {
            invoice.id = invoice._id.toString()
            delete invoice._id
          })

          return invoices

        })
    })





}
export default getAllInvoices