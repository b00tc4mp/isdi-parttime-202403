import "dotenv/config"
import mongoose from "mongoose"

import updateResult from "./updateResult.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateResult("66b0b8ff337c2b614a26583b", "66c710b7724e091957a60d88", 50, null, null)
                .then(() => console.log("result updated"))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

