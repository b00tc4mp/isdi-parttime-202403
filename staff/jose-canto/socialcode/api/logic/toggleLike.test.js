import "dotenv/config"
import mongoose from "mongoose"
import toggleLike from './toggleLike.js'


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      toggleLike("Jack", "668433e9cb80df21e9d9707f", (error, postLiked) => {

        if (error) {
          console.error(error)

          return
        }

        if (postLiked) {
          console.log("post liked")
        } else {

          console.log("post not liked")
        }
      })

    } catch (error) {
      console.error(error)
    }

  })
  .catch(error => console.error(error))
