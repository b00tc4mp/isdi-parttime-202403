import "dotenv/config"
import mongoose from "mongoose"

import getAllResults from "./getAllResults.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getAllResults("66b0b8ff337c2b614a26583b")
                .then(() => console.log("results retrieved"))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
