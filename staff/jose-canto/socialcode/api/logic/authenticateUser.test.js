import "dotenv/config"
import authenticateUser from './authenticateUser.js'
import mongoose from "mongoose"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {

    try {
      authenticateUser("Jack", "1234", (error, userFound) => {
        if (error) {
          console.error(error)

          return
        }

        console.log(`User ${userFound} authenticated`)
      })

    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))


