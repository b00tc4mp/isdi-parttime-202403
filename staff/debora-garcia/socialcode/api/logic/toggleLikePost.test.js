import "dotenv/config"
import mongoose from "mongoose"

import toggleLikePost from "./toggleLikePost.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost("66863f2bea3bed4dd5940a5a", "6686542027957f6dc902cff1", error => {
                if (error) {
                    console.error(error)

                    return
                }

                console.log("user toggled like")
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))