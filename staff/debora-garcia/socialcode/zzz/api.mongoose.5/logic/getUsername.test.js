import "dotenv/config"
import mongoose from "mongoose"

import getUsername from "./getUsername.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUsername("668685cbad5efafee581310c", "668685cbad5efafee581310c")
                .then(username => console.log("username retrieved", username))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))