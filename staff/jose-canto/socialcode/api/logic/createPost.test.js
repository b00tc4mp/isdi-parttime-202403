import "dotenv/config"
import mongoose from "mongoose"
import createPost from './createPost.js'

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {

    try {
      createPost("668d0dce22a4d7ecd962b170", "hello World", "https://media.giphy.com/media/9FEMsCDEta9sL0GpKM/giphy.gif?cid=82a1493bf2ixl19i6a1ge1o8kpqdj1rbnkpc7k7xpvjn3mvj&ep=v1_gifs_trending&rid=giphy.gif&ct=g", "how are you?")
        .then(() => {
          console.log("posts created")
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




