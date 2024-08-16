import "dotenv/config"
import mongoose from "mongoose"

import getResults from "./getResults.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getResults("66b0b8ff337c2b614a26583b")
            .then((results) => console.log("results retrieved",results))
            .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
