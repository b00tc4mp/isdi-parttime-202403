import "dotenv/config"

import mongoose from "mongoose";
import getAllCustomers from "./getAllCustomers.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getAllCustomers("66a9e4ccb94351e424af6273")
        .then((customers) => {
          console.log(`Customers list obtained ${customers}`)

        })
        .catch(error => console.error(error))

    } catch (error) {
      console.error(error)
    }

  })
  .catch(error => console.error(error))