import "dotenv/config"
import mongoose from "mongoose"
import createPostComment from './createPostComments.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createPostComment("668698726b9bbf5c26a74888", "668698996b9bbf5c26a7488c", "Test comentario", (error) => {

        if (error) {
          console.error(error)

          return
        }

        console.log("comment created")
      })

    } catch (error) {

      console.error(error)
    }
  })
  .catch(error => console.error(error))




