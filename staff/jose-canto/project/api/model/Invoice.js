import { Schema, Types, model } from "mongoose"

const { ObjectId } = Types

const invoice = new Schema({
  date: {
    type: Date,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  customer: {
    type: ObjectId,
    ref: "User",
  },
  company: {
    type: ObjectId,
    ref: "User",
  },
  DeliveryNote: {
    type: ObjectId,
    ref: "DeliveryNote",
  },
  observations: {
    type: String,
    required: false
  },
  paymentType: {
    type: String,
    required: true
  }
})

const Invoice = model("Inovice", invoice)

export default Invoice