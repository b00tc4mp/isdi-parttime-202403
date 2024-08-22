import "dotenv/config"
import mongoose from "mongoose"

import updateResult from "./updateResult.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            updateResult("66abe056713a8be92f8e5844", "66bde2c62e4b5d509cbbedda", "50", "", "")
                .then(() => console.log("result updated"))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))

