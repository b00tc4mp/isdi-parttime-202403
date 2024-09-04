import "dotenv/config"
import mongoose from "mongoose"

import toggleLikePost from "./toggleLikePost.js"

const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost("66abe056713a8be92f8e5844", "66bb74a7ce4a3bbf015fab9a")
                .then(() => console.log("liked"))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
