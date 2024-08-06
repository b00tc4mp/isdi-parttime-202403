import "dotenv/config"
import mongoose from "mongoose"
import createWork from "./createWork.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      createWork("66b1237dd5adf0eb620e97bc", "66b1df1b5e2a7bde700d0310", "Trabajo de prueba", 1, 200.50)
        .then((work) => {
          console.log(work)
        })
        .catch(error => console.error(error))

    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))