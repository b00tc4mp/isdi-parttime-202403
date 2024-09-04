import "dotenv/config"
import mongoose from "mongoose"

import getUsername from "./getUsername.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            getUsername("66aa2bd4a1a5baa443a56858", "66abe056713a8be92f8e5844")
                .then((username) => console.log("user retrieved", username))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))