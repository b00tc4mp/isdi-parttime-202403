import "dotenv/config"
import deletePost from './deletePost.js'
import mongoose from "mongoose"


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {

    try {
      deletePost("6686980096815ae00d1ad34f", "668698996b9bbf5c26a7488c", error => {

        if (error) {
          console.error(error)

          return
        }

        console.log("posts deleted")
      })

    } catch (error) {

      console.error(error)
    }

  })
  .catch(error => console.error(error))