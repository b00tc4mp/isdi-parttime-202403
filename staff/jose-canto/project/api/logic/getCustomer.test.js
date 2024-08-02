import "dotenv/config"
import mongoose from "mongoose"
import getCustomer from "./getCustomer.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getCustomer("66ab9387e2e5e2ef52b61603", "66ab9478e2e5e2ef52b6160a")
        .then((customer) => {
          console.log(customer)
        })
        .catch((error) => console.error(error.message))
    } catch (error) {
      console.error(error.message)
    }
  })
  .catch((error) => console.error(error.message))