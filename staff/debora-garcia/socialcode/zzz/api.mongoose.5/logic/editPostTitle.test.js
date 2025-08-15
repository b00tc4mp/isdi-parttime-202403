import "dotenv/config"
import mongoose from "mongoose"

import editPostTitle from "./editPostTitle.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            editPostTitle("668685aead5efafee5813100", "6686860bad5efafee5813135","title edited")
                .then(() => console.log("post modified"))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
