import "dotenv/config"
import mongoose from "mongoose"

import authenticateuser from "./authenticateUser.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            authenticateuser("victor", "1234")
                .then(() => console.log("user authenticated"))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))