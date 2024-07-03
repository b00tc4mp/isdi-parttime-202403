import "dotenv/config"
import deletePost from './deletePost.js'
import mongoose from "mongoose"


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {

    try {
      deletePost("Lolo", "6683dcae2f70f72e23d68e31", error => {

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