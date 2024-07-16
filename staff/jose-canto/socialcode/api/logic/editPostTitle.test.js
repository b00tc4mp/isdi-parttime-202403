import "dotenv/config"
import mongoose from "mongoose"
import editPostTitle from './editPostTitle.js'

const { MONGODB_URL } = process.env


mongoose.connect(MONGODB_URL)
  .then(() => {

    try {
      editPostTitle("6686f76feede6666644a273b", "668fb1585b1daab7462270a4", "OUHHhhh yeah")
        .then(() => {
          console.log("Post title edited")
        })
        .catch(error => console.error(error))

    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))