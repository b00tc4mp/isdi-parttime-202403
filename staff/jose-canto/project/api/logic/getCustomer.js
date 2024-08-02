import validate from "com/validate.js"
import { User } from "../model/index.js"

function getCustomer(userId, customerId) {
  validate.id(userId, "userId")
  validate.id(customerId, "customerId")

  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError("User not found")
      }

      return User.findById(customerId).select("-__v").lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(customer => {
          if (!customer) {
            throw new NotFoundError("Customer not found")
          }
          customer.id = customer._id.toString()
          delete customer._id

          if (customer.manager) {
            customer.manager = customer.manager.toString()
          }
          return customer
        })
    })
}

export default getCustomer