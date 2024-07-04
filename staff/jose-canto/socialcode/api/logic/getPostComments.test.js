import "dotenv/config"
import getPostComments from './getPostComments.js'
import mongoose from "mongoose"

const { MONGODB_URL } = process.env


mongoose.connect(MONGODB_URL)
  .then(() => {

    try {
      getPostComments("668698726b9bbf5c26a74888", "6686a31f86430bf971fba0a7", (error, comments) => {

        if (error) {
          console.error(error)

          return
        }

        console.log("comments retrieved", JSON.stringify(comments))
      })

    } catch (error) {

      console.error(error)
    }
  })
  .catch(error => console.error(error))