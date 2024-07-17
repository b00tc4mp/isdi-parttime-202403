import "dotenv/config"
import mongoose from "mongoose"
import toggleLike from './toggleLike.js'


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      toggleLike("6686aac02f7668c202a5f97f", "668d4687899458f8a1f7ffc8")
        .then((postLiked) => {

          if (postLiked) {
            console.log("post liked")
          } else {
            console.log("post not liked")
          }
        })
        .catch((error) => {
          console.error(error)
          return
        })
    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))
