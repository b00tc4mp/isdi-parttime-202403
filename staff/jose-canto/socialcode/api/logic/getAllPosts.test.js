import "dotenv/config"
import mongoose from "mongoose"
import getAllPosts from './getAllPosts.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getAllPosts("668d0dce22a4d7ecd962b170", 1, 2)
        .then((posts) => {
          console.log("posts retrieved", posts)
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