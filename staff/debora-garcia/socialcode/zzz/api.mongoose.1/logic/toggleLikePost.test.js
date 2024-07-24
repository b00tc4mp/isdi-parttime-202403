import "dotenv/config"
import mongoose from "mongoose"

import toggleLikePost from "./toggleLikePost.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            toggleLikePost("LionLeo", "668512d5ab0c0e67ff7f44ee", error => {
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