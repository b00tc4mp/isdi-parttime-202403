import "dotenv/config"
import mongoose from "mongoose"
import addNewObservation from "./addNewObservation.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    try {
      addNewObservation("66c44e9b220373c3309cfa43", "66c773a87e710952748e1b43", "Observacion de Lolo")
        .then((observation) => {
          console.log(observation)
        })
        .catch(error => console.error(error))

    } catch (error) {
      console.error(error)
    }
  })
  .catch(error => console.error(error))
