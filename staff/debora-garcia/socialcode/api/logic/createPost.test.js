import "dotenv/config"
import mongoose from "mongoose"

import createPost from "./createPost.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPost("668685cbad5efafee581310c", "promise", "http---", "description")
                .then(() => console.log("post created"))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
