import "dotenv/config"
import mongoose from "mongoose"

import createPost from "./createPost.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPost("Mongo", "Test", "http---", "description", (error) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log("post created")
            })
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
