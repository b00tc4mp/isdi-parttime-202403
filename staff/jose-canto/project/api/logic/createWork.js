import validate from "com/validate.js";
import { Work, User, DeliveryNote } from "../model/index.js";
import { NotFoundError, SystemError } from "com/errors.js"


const createWork = (userId, deliveryNoteId, concept, quantity, price) => {
  validate.id(userId, "userId")
  validate.id(deliveryNoteId, "deliveryNoteId")
  validate.text(concept, "concept")
  validate.number(quantity, "quantity")
  validate.number(price, "price")


  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) {
        throw new NotFoundError("User not found")
      }

      return DeliveryNote.findById(deliveryNoteId)
        .catch(error => { throw new SystemError(error.message) })
        .then((deliveryNote) => {
          if (!deliveryNote) {
            throw new NotFoundError("Delivery note not found")
          }

          const work = {
            concept,
            quantity,
            price,
          }

          return Work.create(work)
            .catch(error => { throw new SystemError(error.message) })
            .then((work) => {

              return DeliveryNote.findByIdAndUpdate(deliveryNoteId, { $push: { works: work._id } })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => {
                  return work
                })
            })
        })
    })
}

export default createWork