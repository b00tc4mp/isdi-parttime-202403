import "dotenv/config"
import mongoose from "mongoose"

import createComment from "./createComment.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createComment("66aa2bd4a1a5baa443a56858", "66c9a2ab7327afe8d24678b1", "my first comment")
                .then(() => console.log("comment created"))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))