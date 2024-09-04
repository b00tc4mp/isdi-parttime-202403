import "dotenv/config"
import mongoose from "mongoose"

import authenticateuser from "./authenticateUser.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            authenticateuser("RotoJaz", "1234")
                .then((userId) => console.log("user authenticated", userId))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))