import validate from "com/validate.js"
import { User, DeliveryNote } from "../model/index.js"
import { NotFoundError, SystemError } from "com/errors.js"

const createDeliveryNote = (userId, customerId) => {
  validate.id(userId, "userId")
  validate.id(customerId, "customerId")


  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError("User not found")
      }

      const deliveryNote = {
        date: new Date(),
        number: "2024/" + Math.floor(Math.random() * 1000),
        company: userId,
        customer: customerId,
        observations: "",
        works: [],
      }

      return DeliveryNote.create(deliveryNote)
        .catch(error => { throw new SystemError(error.message) })
        .then((deliveryNote) => {
          return deliveryNote
        })
    })
}
export default createDeliveryNote