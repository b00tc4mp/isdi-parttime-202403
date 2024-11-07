import "dotenv/config"
import mongoose from "mongoose"

import createPost from "./createPost.js"
const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
    .then(() => {
        try {
            createPost("66b0b8ff337c2b614a26583b", "66b46fce589823a33b52cca2", "https://cdn.shopify.com/s/files/1/0274/4621/4721/files/wod-danielle-brandon.jpg?v=1678990866", "my first post", 30, 10, 50)
                .then(() => console.log("post created"))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))
