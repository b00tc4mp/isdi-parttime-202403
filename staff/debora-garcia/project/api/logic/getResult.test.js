import "dotenv/config"
import mongoose from "mongoose"

import getResult from "./getResult.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getResult("66b0b8ff337c2b614a26583b","66c76fb8fae87ccbc5fd0d53")
                .then(() => console.log("results retrieved"))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
