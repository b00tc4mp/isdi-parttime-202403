import "dotenv/config"
import mongoose from "mongoose"
import createDeliveryNote from "./createDeliveryNote.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createDeliveryNote("66b1237dd5adf0eb620e97bc", "66b12778d5adf0eb621213a7")
        .then((deliveryNote) => {
          console.log(deliveryNote)
        })
        .catch(error => console.error(error))

    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))