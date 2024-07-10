import "dotenv/config"
import registerUser from './registerUser.js'
import mongoose from "mongoose"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      registerUser("Pepito", "Grillo", "pepito@grillo.es", "pepitogrillo", "1234", "1234")
        .then(() => {
          console.log("User created")
        })
        .catch(() => {
          console.error(error)
          return
        })
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))
