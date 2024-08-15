import "dotenv/config"
import mongoose from "mongoose"
import deleteCustomer from "./deleteCustomer.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {

    try {
      deleteCustomer("66bb972f98051f33903e9a7c", "66bda6c6c129a4720c76911c")
        .then(() => {
          console.log(`Customer deleted`)
        })
        .catch(error => console.error(error))
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))
