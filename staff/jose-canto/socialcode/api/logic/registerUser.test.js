import "dotenv/config"
import registerUser from './registerUser.js'
import mongoose from "mongoose"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      registerUser("Bruce", "Wayne", "batman@email.es", "batman", "1234", "1234", (error) => {
        if (error) {
          console.error(error)

          return
        }

        console.log("User created")
      })

    } catch (error) {
      console.error(error)
    }

  })
  .catch(error => console.error(error))
