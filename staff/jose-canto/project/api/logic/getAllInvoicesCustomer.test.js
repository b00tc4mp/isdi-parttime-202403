import "dotenv/config"
import mongoose from "mongoose";

import getAllInvoicesCustomer from "./getAllInvoicesCustomer.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getAllInvoicesCustomer("66bdb9e2859c06c6535cfb14", "66bdd4c732fcba8cafde2520")
        .then((invoices) => {
          console.log(invoices)
        })
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))