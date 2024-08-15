import validate from "com/validate.js"
import { User } from "../model/index.js"
import { NotFoundError, SystemError } from "com/errors.js"


const deleteCustomer = (userId, customerId) => {
  validate.id(userId, "userId")
  validate.id(customerId, "customerId")

  return User.findById(userId).select("-__v").lean()
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

          if (customer.manager.toString() !== userId) {
            throw new NotFoundError("Can not delete Customer from another user")
          }

          return User.deleteOne({ _id: customerId })
            .catch(error => { throw new SystemError(error.message) })
            .then(() => { })
        })
    })
}

export default deleteCustomer