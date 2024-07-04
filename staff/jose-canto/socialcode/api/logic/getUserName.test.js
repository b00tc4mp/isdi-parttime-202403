import "dotenv/config"
import getUserName from './getUserName.js'
import mongoose from "mongoose"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      getUserName("6686771e2288837791e6fa9b", "6686771e2288837791e6fa9b", (error, name) => {
        if (error) {

          console.error(error)

          return
        }

        console.log(`Name : ${name}`)
      })

    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))