import "dotenv/config"
import mongoose from "mongoose"
import createDeliveryNote from "./createDeliveryNote.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createDeliveryNote("66b27b9b89b90b8bc6b3c2fd", "66b27d9b89b90b8bc6b573e6")
        .then((deliveryNote) => {
          console.log(deliveryNote)
        })
        .catch(error => console.error(error))

    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))