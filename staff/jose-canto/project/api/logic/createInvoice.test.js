import "dotenv/config"
import mongoose from "mongoose"
import createInvoice from "./createInvoice.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createInvoice("66b1237dd5adf0eb620e97bc", "66b230c7c25b4cce879aa804", ["66b799457ccc47f54c9f021e", "66b79a3b7ccc47f54c9f024a"])
        .then((invoice) => {
          console.log(invoice)
        })
        .catch((error) => console.error(error))

    } catch (error) {
      console.error(error)
    }
  })
  .catch((error) => console.error(error))