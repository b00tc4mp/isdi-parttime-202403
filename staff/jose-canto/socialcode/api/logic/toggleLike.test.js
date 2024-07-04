import "dotenv/config"
import mongoose from "mongoose"
import toggleLike from './toggleLike.js'


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      toggleLike("6686704d2b06457efb4a9376", "66866e0dd805a3a2b64dc591", (error, postLiked) => {

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
