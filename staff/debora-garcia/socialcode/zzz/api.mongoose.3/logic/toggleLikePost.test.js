import "dotenv/config"
import mongoose from "mongoose"

import toggleLikePost from "./toggleLikePost.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost("668685cbad5efafee581310c", "668685dcad5efafee5813118")
                .then(() => console.log("user toggled like"))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))