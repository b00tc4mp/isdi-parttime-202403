import "dotenv/config"
import mongoose from "mongoose"
import deleteDeliveryNote from "./deleteDeliveryNote.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {

    try {
      deleteDeliveryNote("66b1237dd5adf0eb620e97bc", "66b8cbece4f3e5906c7f2f69")
        .then(() => {
          console.log(`Delivery note deleted`)
        })
        .catch(error => console.error(error))

    } catch (error) {
      console.error(error)
    }

  })
  .catch(error => console.error(error))