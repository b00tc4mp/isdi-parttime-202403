import "dotenv/config"
import deletePost from './deletePost.js'
import mongoose from "mongoose"


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {

    try {
      deletePost("668d0dce22a4d7ecd962b170", "668d847e75cd7dfc6c5dbb39")
        .then(() => {
          console.log("posts deleted")
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