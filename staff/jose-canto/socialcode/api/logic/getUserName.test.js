import "dotenv/config"
import getUserName from './getUserName.js'
import mongoose from "mongoose"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getUserName("668d0dce22a4d7ecd962b170", "668d0dce22a4d7ecd962b170")
        .then((name) => {
          console.log(`Name : ${name}`)
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