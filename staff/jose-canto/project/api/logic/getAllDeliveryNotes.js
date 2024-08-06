import validate from "com/validate.js"
import { User, DeliveryNote } from "../model/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const getAllDeliveryNotes = (userId) => {
  validate.id(userId, "userId")

  return User.findById(userId)
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError("user not found")
      }

      return DeliveryNote.find({})
        .populate("customer", "username companyName")
        .select("-__v")
        .lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(deliveryNotes => deliveryNotes.map(deliveryNote => {
          deliveryNote.id = deliveryNote._id.toString()
          delete deliveryNote._id

          deliveryNote.customerName = deliveryNote.customer?.companyName || deliveryNote.customer?.username

          return deliveryNote
        }))
    })
}

export default getAllDeliveryNotes
