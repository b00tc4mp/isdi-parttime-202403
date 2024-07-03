import "dotenv/config"
import mongoose from "mongoose"
import createPostComment from './createPostComments.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createPostComment("Jack", "668433e9cb80df21e9d9707f", "Test comentario", (error) => {

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




