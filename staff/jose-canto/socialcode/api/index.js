import "dotenv/config"
import express from 'express'
import cors from "cors"
import mongoose from "mongoose"

import router from "./routes.js"
import errorHandler from "./handlers/errorHandler.js"

const { PORT, MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
  .then(() => {
    const api = express()

    api.use(cors())

    api.get("/", (req, res) => {
      res.send("Hello World")
    })

    api.use("/", router)

    api.use(errorHandler)

    api.listen(PORT, () => console.log(`listening on port http://localhost:${PORT}/app/login`))
  })
  .catch(error => console.error(error))