import "dotenv/config"
import getPostComments from './getPostComments.js'
import mongoose from "mongoose"

const { MONGODB_URL } = process.env


mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getPostComments("6686aac02f7668c202a5f97f", "668d4687899458f8a1f7ffc8")
        .then((comments) => {

          console.log("comments retrieved", JSON.stringify(comments))
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