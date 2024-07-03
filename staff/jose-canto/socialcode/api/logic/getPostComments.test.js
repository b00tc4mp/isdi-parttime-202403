import "dotenv/config"
import getPostComments from './getPostComments.js'
import mongoose from "mongoose"

const { MONGODB_URL } = process.env


mongoose.connect(MONGODB_URL)
  .then(() => {

    try {
      getPostComments("Jack", "667e93990fee8336e46238f7", (error, comments) => {

        if (error) {
          console.error(error)

          return
        }

        console.log("comments retrieved", comments)
      })

    } catch (error) {

      console.error(error)
    }
  })
  .catch(error => console.error(error))