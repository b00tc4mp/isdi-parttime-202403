import "dotenv/config"
import mongoose from "mongoose"
import deleteDeliveryNote from "./deleteDeliveryNote.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {

    try {
      deleteDeliveryNote("66b1237dd5adf0eb620e97bc", "66b8d630e4f3e5906c89d05b")
        .then((deliveryNote) => {
          console.log(`Delivery note ${deliveryNote} deleted`)
        })
        .catch(error => console.error(error))

    } catch (error) {
      console.error(error)
    }

  })
  .catch(error => console.error(error))