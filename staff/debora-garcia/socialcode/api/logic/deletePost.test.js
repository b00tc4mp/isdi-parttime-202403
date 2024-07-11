import "dotenv/config"
import mongoose from "mongoose"

import deletePost from "./deletePost.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {

        try {
            deletePost("668685cbad5efafee581310c", "668e7b8650739a7e8bc67ef8")
                .then(() => console.log("post deleted"))
                .catch(error => console.error(error))


        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
