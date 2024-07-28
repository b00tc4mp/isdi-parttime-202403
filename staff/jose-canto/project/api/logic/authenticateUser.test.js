import "dotenv/config"
import authenticateUser from "./authenticateUser.js"
import mongoose from "mongoose"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {

      authenticateUser("Jack", "1234")
        .then((userId) => {
          console.log(`User ${userId} authenticated `)
        })
        .catch(error => console.error(error))

    } catch (error) {
      console.error(error)
    }

  })
  .catch(error => console.error(error))